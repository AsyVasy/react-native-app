// Components/Test.js

import React from 'react';
import { StyleSheet, View, Animated, Text, TextInput, Button } from 'react-native';
import { userService } from '../_services';
const axios = require('axios');

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: 'aaa',
			password: 'aaa',
			submitted: false,
			loading: false,
			error: '',
			redirected: false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
		console.log(name, value);
	}

	async handleSubmit(e) {
		// e.preventDefault();

		const { username, password } = this.state;

		console.log('username :', username);
		console.log('password :', password);
		userService
			.login(username, password)
			.then(result => {
				console.log('ok');
				this.setState({ redirected: true });
			})
			.catch(err => {
				console.log();
			});
	}

	_checkLogin() {
		const { username, password } = this.state;
		console.log('hey there ');
		if (username === 'toto' && password === 'toto') {
			console.log('CCCOOOL');
		} else {
			console.log('no coooool');
		}
	}

	render() {
		return (
			<View>
				<Text style={styles.title_text}>Login</Text>
				<TextInput
					style={styles.textinput}
					placeholder='username'
					name='username'
					onChangeText={text => this.setState({ username: text })}></TextInput>

				<TextInput
					style={styles.textinput}
					placeholder='password'
					secureTextEntry={true}
					onChangeText={text => this.setState({ password: text })}></TextInput>
				<Button title='LOGIN' onPress={() => this._checkLogin()}></Button>
				<Button title='LOGIN' onPress={() => this.handleSubmit()}></Button>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	main_container: {
		flex: 1,
	},
	title_text: {
		fontWeight: 'bold',
		fontSize: 20,
		// flex: 1,
		flexWrap: 'wrap',
		// paddingRight: 5,
	},
	textinput: {
		marginLeft: 5,
		marginRight: 5,
		height: 50,
		borderColor: '#000000',
		borderWidth: 1,
		paddingLeft: 5,
	},
	loading_container: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 100,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	share_image: {
		width: 30,
		height: 30,
	},
	icon: {
		width: 100,
		height: 100,
		backgroundColor: 'grey',
	},
	platform_img: {
		width: 100,
		height: 100,
		backgroundColor: 'grey',
	},
});
export default Login;
