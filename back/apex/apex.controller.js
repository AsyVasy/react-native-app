const express = require('express');
const router = express.Router();
// const userService = require('./user.service');
const axios = require('axios');
const variables = require('../utils/config.var')();

// routes
router.post('/apex', getStatus);

module.exports = router;

function getStatus(req, res, next) {
	console.log('ASKING ' + req.body.pseudo + ' ON ' + req.body.platform);
	axios
		.get(
			'https://public-api.tracker.gg/v2/apex/standard/profile/' + req.body.platform + '/' + req.body.pseudo,
			variables.apex_header
		)
		.then(function(response) {
			// console.log(response.data.data);

			let profile;
			response.data ? (profile = response.data) : (profile = 'not found');
			res.send(profile);
		})
		.catch(function(error) {
			console.log('err', error.response.data);
			res.send('error');
		});
}
