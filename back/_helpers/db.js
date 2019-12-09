// const config = require("config.json");
const mysql = require('mysql');
const connectionVar = require('../utils/config.var')();

// const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
// mongoose.Promise = global.Promise;

const db = mysql.createConnection(connectionVar.connection);

// connect to database
db.connect(err => {
	if (err) {
		throw err;
	}
	console.log('Connected to database');
});

global.db = db;

module.exports = db;

// Exemple de requête
// let query = 'SELECT * FROM `users`';

// db.query(query, (err, result) => {
// 	if (err) {
// 		console.error(err);
// 	} else {
// 		console.log(result);
// 	}
// });

// module.exports = {
// 	User: require('../users/user.service'),
// };
