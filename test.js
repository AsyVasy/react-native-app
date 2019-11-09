const axios = require('axios');

function toto(pseudo, platform) {
	return new Promise((resolve, reject) => {
		axios
			.post('http://193.70.40.200:8080/apex', {
				pseudo: pseudo,
				platform: platform,
			})
			.then(function(response) {
				var entry = response.data;

				if (entry) {
					resolve(entry);
				} else {
					reject(entry);
				}
			})
			.catch(function(error) {
				console.log('err', error);
			});
	});
}

const wesh = async () => {
	let ouaigros = await toto('asyvasy', 'psn');
	console.log(ouaigros.data.platformInfo.avatarUrl);
};

wesh();
