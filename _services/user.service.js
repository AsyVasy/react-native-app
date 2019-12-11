import { authHeader } from '../_helpers';
// import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';

export const userService = {
	login,
	logout,
	getAll,
	register,
	registerBis,
};

async function login(username, password) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, password }),
	};

	return fetch(`http://193.70.40.200:3000/users/authenticate`, requestOptions)
		.then(handleResponse)
		.then(async user => {
			// login successful if there's a user in the response
			if (user) {
				// store user details and basic auth credentials in local storage
				// to keep user logged in between page refreshes
				// user.authdata = window.btoa(username + ":" + password);
				try {
					await AsyncStorage.setItem('user', JSON.stringify(user));
				} catch (e) {
					// saving error
				}
			}
			return user;
		});
}

function logout() {
	// remove user from local storage to log user out
	console.log('logout');
	AsyncStorage.removeItem('user');
}

function getAll() {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};

	return fetch(`/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
	return response.text().then(text => {
		const data = text && JSON.parse(text);
		if (!response.ok) {
			if (response.status === 401) {
				// auto logout if 401 response returned from api
				logout();
			}

			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}

		return data;
	});
}

function register(username, password, lastname) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, password, lastname }),
	};

	return fetch(`http://193.70.40.200:3000/users/createUser`, requestOptions)
		.then(handleResponse)
		.then(user => {
			console.log(user);
			// register successful if there's a user in the response
			if (user) {
			}

			return user;
		});
}
function registerBis(username, password, lastname, firstname) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, password, lastname, firstname }),
	};

	return fetch(`http://193.70.40.200:3000/users/registerbis`, requestOptions)
		.then(handleResponse)
		.then(user => {
			console.log(user);
			// register successful if there's a user in the response
			if (user) {
			}

			return user;
		});
}
