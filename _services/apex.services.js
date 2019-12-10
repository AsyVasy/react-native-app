import axios from 'axios';

export function getApexData(pseudo, platform) {
	return new Promise((resolve, reject) => {
		axios
			.post('http://193.70.40.200:3000/apex/apex', {
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
