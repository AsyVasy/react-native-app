// Components/Test.js

import React from 'react';
import { StyleSheet, View, Animated, Text, TextInput, Button, AsyncStorage } from 'react-native';
import { userService } from '../_services';
import { connect } from 'react-redux';

class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: 'aaa',
			password: 'aaa',
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
		// console.log(name, value);
	}

	async handleSubmit(e) {
		const { username, password } = this.state;
		userService
			.login(username, password)
			.then(result => {
				// this.setState({ toProfile: true });
				const action = { type: 'MANAGE_PROFILE', value: '1' };
				this.props.dispatch(action);
				this.setState({ toProfile: this.props.statusPageToProfile });
				this.setState({ user: result });
			})
			.catch(err => {
				// console.log();
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
				<Button
					title='Login
						'
					onPress={() => this.handleSubmit()}></Button>
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

export default connect(mapStateToProps)(LoginPage);
