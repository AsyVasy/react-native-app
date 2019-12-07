const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
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

module.exports = router;

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
