// Components/Test.js

import React from 'react';
import { StyleSheet, View, Animated, Text, TextInput, Button, AsyncStorage } from 'react-native';
import { userService } from '../_services';
import ProfilePage from './ProfilePage';
import LoginPage from './LoginPage';
import { connect } from 'react-redux';

const axios = require('axios');
// import AsyncStorage from '@react-native-community/async-storage';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: 'jo',
			firstname: '',
			lastname: '',
			password: '1234',
			submitted: false,
			loading: false,
			error: '',
			redirected: false,
			toProfile: '0',
			user: {},
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
		console.log(name, value);
	}

	_goRegister(index) {
		this.setState({ toProfile: index });
	}

	async handleSubmit(e) {
		const { username, password } = this.state;
		userService
			.login(username, password)
			.then(result => {
				// this.setState({ toProfile: true });
				// console.log('res ', result);
				const action = { type: 'MANAGE_PROFILE', value: '1' };
				this.props.dispatch(action);
				this.setState({ toProfile: this.props.statusPageToProfile });
				this.setState({ user: result });
			})
			.catch(err => {
				console.log();
			});
	}
	async handleSubmitRegister(e) {
		const { username, password, lastname, firstname } = this.state;
		userService
			.registerBis(username, password, lastname, firstname)
			.then(result => {
				// this.setState({ toProfile: true });
				// console.log('res ', result);
				const action = { type: 'MANAGE_PROFILE', value: '1' };
				this.props.dispatch(action);
				this.setState({ toProfile: this.props.statusPageToProfile });
				this.setState({ user: result });
			})
			.catch(err => {
				console.log();
			});
	}

	async _checkLogin() {
		try {
			const action = { type: 'MANAGE_PROFILE', value: '1' };
			this.props.dispatch(action);
			this.setState({ toProfile: this.props.statusPageToProfile });
		} catch (e) {
			// error reading value
		}
	}

	async componentWillMount() {
		let value = await AsyncStorage.getItem('user');
		let toto = JSON.parse(value);
		if (value !== null) {
			// console.log(value);
			this.setState({ toProfile: '1' });
			this.setState({ user: toto });
		}
	}

	render() {
		let { user, toProfile } = this.state;
		if (toProfile == '0') {
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
					{/* <Button title='LOGIN' onPress={() => this._checkLogin()}></Button> */}
					<Button title='Login' onPress={() => this.handleSubmit()}></Button>
					<Button
						title="If you don't have any account clic here to register"
						onPress={() => this._goRegister('2')}></Button>
				</View>
			);
		} else if (toProfile == '1' && user) {
			return <ProfilePage user={user} navigation={this.props.navigation} />;
		} else if (toProfile == '2') {
			return (
				<View>
					<Text style={styles.title_text}>Register</Text>

					<TextInput
						style={styles.textinput}
						placeholder='username'
						name='username'
						onChangeText={text => this.setState({ username: text })}></TextInput>

					<TextInput
						style={styles.textinput}
						placeholder='firstname'
						name='firstname'
						onChangeText={text => this.setState({ firstname: text })}></TextInput>

					<TextInput
						style={styles.textinput}
						placeholder='lastname'
						name='lastname'
						onChangeText={text => this.setState({ lastname: text })}></TextInput>

					<TextInput
						style={styles.textinput}
						placeholder='password'
						secureTextEntry={true}
						onChangeText={text => this.setState({ password: text })}></TextInput>
					{/* <Button title='LOGIN' onPress={() => this._checkLogin()}></Button> */}
					<Button title='Register' onPress={() => this.handleSubmitRegister()}></Button>
					<Button title='Go to login' onPress={() => this._goRegister('0')}></Button>
				</View>
			);
		}
		return (
			<View>
				<Text>Bravo</Text>
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

// On connecte le store Redux, ainsi que les films favoris du state de notre application, à notre component Search
const mapStateToProps = state => {
	return {
		favoritesFilm: state.favoritesFilm,
		favoritesProfile: state.favoritesProfile,
		statusPageToProfile: state.statusPageToProfile,
	};
};

export default connect(mapStateToProps)(Login);
