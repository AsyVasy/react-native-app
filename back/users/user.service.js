const config = require('config.json');
const jwt = require('jsonwebtoken');
// const bcrypt = require("bcryptjs");
const db = require('_helpers/db');

module.exports = {
	authenticate,
	createUser,
	checkByUsername,
	register,
	getAll,
	getById,
	updateUser,
	deleteUser,
	create,
	authenticateBis,
};

function create(clbk, data) {
	console.log(data);
	const q = 'INSERT INTO `users`(`username`, `password`, `lastname`, `firstname`) VALUES (?,?, ?, ?)';
	const payload = [data.username, data.password, data.lastname, data.firstname];

	db.query(q, payload, (err, res, cols) => {
		console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
		if (err) return clbk(err, null);
		return clbk(null, res);
	});
}

async function authenticateBis(clbk, user) {
	const sql = `SELECT * FROM users WHERE username = ?`;
	const q = db.query(sql, user.username, (err, user) => {
		if (err) return clbk(err, null);
		return clbk(null, ...user);
	});
	console.log(q.sql);
}

async function authenticate({ username, password }) {
	var sql =
		"SELECT username, password, firstname, lastname, created_at FROM `users` WHERE `username`='" +
		username +
		"' and password = '" +
		password +
		"'";

	return new Promise((resolve, reject) => {
		db.query(sql, (err, results) => {
			if (err) {
				reject(err);
			} else {
				let user = results[0];
				console.log(results);
				user.token = jwt.sign({ foo: 'bar' }, 'test');

				resolve(user);
			}
		});
	});
}

async function checkByUsername(username) {
	const sql = 'SELECT * FROM users WHERE username = ?';

	return new Promise((resolve, reject) => {
		db.query(sql, [username], (err, res) => {
			if (err) {
				reject(err);
			} else {
				// console.log('checkbyuser => ', res);
				resolve(res);
			}
		});
	});
}

async function createUser(data) {
	var sql = 'INSERT INTO `users`(`username`, `password`, `lastname`) VALUES (?, ?, ?)';
	var payload = [data.username, data.password, data.lastname];

	return new Promise((resolve, reject) => {
		db.query(sql, payload, (err, res) => {
			if (err) {
				reject(err);
			} else {
				// console.log('createuser => ', res);
				resolve(res);
			}
		});
	});
}

async function register(data) {
	var check = await checkByUsername(data);

	if (check.length) {
		console.log('cet user existe deja ');
	} else {
		createUser(data);
	}
}

async function getAll() {
	const sql = 'SELECT * FROM users';

	return new Promise((resolve, reject) => {
		db.query(sql, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
				console.log(res);
			}
		});
	});
}

async function getById(id) {
	const sql = 'SELECT * FROM users WHERE id = ?';

	return new Promise((resolve, reject) => {
		db.query(sql, [id], (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		});
	});
}

async function updateUser(data) {
	let sql = 'UPDATE users SET ';
	const payload = [];

	const user = data.user;
	for (const key in user) {
		sql += `${key} = ?, `;
		payload.push(user[key]);
	}

	sql = sql.substring(0, sql.length - 2);
	console.log(sql);

	sql += `WHERE id = ?`;

	payload.push(data.id);

	console.log('payload => ', payload);
	return new Promise((resolve, reject) => {
		const q = db.query(sql, payload, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		});
		// console.log('qqqqq => ', q.sql);
	});
}

async function deleteUser(id) {
	const sql = 'DELETE FROM users WHERE id = ?';

	return new Promise((resolve, reject) => {
		db.query(sql, [id], (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		});
	});
}
