const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const bcrypt = require('bcrypt');
const auth = require('./auth');

// routes
// router.post('/authenticate', authenticate);
router.post('/authenticate', authenticateBis);
router.post('/createUser', createUser);
router.post('/register', register);

router.get('/getAll', getAll);
router.get('/username/:username', checkByUsername);
router.get('/id/:id', getById);

router.get('/test', (req, res, next) => {
	console.log('test');
	res.sendStatus(200);
});

router.patch('/id/:id', update);

router.delete('/id/:id', deleteUser);

router.post('/registerBis', registerBis);
module.exports = router;

async function registerBis(req, res) {
	// console.log(req.body);
	const { username, email, password } = req.body;
	const newUser = { username, email };

	const check = await userService.checkByUsername(newUser.username);
	if (check.length > 0) {
		res.send('this user already exists');
	} else {
		bcrypt
			.hash(password, 10)
			.then(hash => {
				newUser.password = hash;
				userService.create(function(err, result) {
					// console.log(result);
					console.log('REGISTERBIS');
					if (err) return res.status(520).send(err);
					return res.status(201).send(result);
				}, newUser);
			})
			.catch(err => {
				return res.status(500).send(err);
			});
	}
}

function authenticateBis(req, res) {
	userService.authenticateBis((err, user) => {
		// si erreur interne au serveur, retourner l'erreur au client
		if (err) return res.status(500).send(err);
		// sinon si le mail n'existe pas en bdd, retourner une erreur au client
		else if (!user) return res.status(401).send('unknown mail');

		console.log('user 1 ', req.body.password);
		console.log('user 2 ', user);
		// sinon  le mail a été trouvé, comparer le password avec son crypt/salt
		bcrypt
			.compare(req.body.password, user.password)
			.then(function(match) {
				// si le password est invalide, retourner une erreur au client
				if (!match) return res.status(401).send('login failed');

				// tout est ok => retourner l'objet user (sans password, etc.) au client
				// accompagné d'un token dans l'entête HTTP pour sécuriser l'accès au dashboard.

				user = auth.removeSensitiveInfo(user);
				const token = auth.createToken(user, req.ip);
				return res
					.header('x-authenticate', token)
					.status(200)
					.send({ user, token });
			})
			.catch(err => {
				console.log('@catch', err);
				res.status(500).send(err);
			}); // si bcrypt a planté, => erreur au client
	}, req.body);
}

function authenticate(req, res, next) {
	console.log('coucou');
	userService
		.authenticate(req.body)
		.then(user => (user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' })))
		.catch(err => next(err));
}

function createUser(req, res) {
	userService
		.createUser(req.body)
		.then(user =>
			user ? res.json(user) : res.status(400).json({ message: ' createUser Username or password is incorrect' })
		)
		.catch(err => next(err));
}

function checkByUsername(req, res) {
	const username = req.params.username;
	userService
		.checkByUsername(username)
		.then(user =>
			user
				? res.json(user)
				: res.status(400).json({ message: ' checkByUsername Username or password is incorrect' })
		)
		.catch(err => next(err));
}

function register(req, res) {
	userService
		.register(req.body)
		.then(user =>
			user ? res.json(user) : res.status(400).json({ message: 'register Username or password is incorrect' })
		)
		.catch(err => next(err));
}

function getAll(req, res, next) {
	console.log('ifbqeifbi');
	userService
		.getAll()
		.then(user => {
			user ? res.json(user) : res.status(400).json({ message: 'getAll Username or password is incorrect' });
		})
		.catch(err => next(err));
}

function getById(req, res, next) {
	const id = req.params.id;
	userService
		.getById(id)
		.then(user => {
			user ? res.json(user) : res.status(400).json({ message: 'getAll Username or password is incorrect' });
		})
		.catch(err => next(err));
}

function update(req, res, next) {
	const id = req.params.id;
	const user = req.body;

	const data = {
		id,
		user,
	};

	console.log(id);
	console.log(data);
	userService
		.updateUser(data)
		.then(user => {
			user ? res.json(user) : res.status(400).json({ message: 'update maggle' });
		})
		.catch(err => next(err));
}

function deleteUser(req, res, next) {
	const id = req.params.id;
	userService
		.deleteUser(id)
		.then(user => {
			user ? res.json(user) : res.status(400).json({ message: 'deleteUser Username or password is incorrect' });
		})
		.catch(err => next(err));
}
