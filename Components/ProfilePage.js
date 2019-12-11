import React from 'react';
import { AsyncStorage, StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicato } from 'react-native';
import { userService } from '../_services';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';

class ProfilePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			redirected: false,
		};
	}

	logout = async () => {
		let toto = await userService.logout();
		const action = { type: 'MANAGE_PROFILE', value: '0' };
		this.props.dispatch(action);
		this.setState({ redirected: true });
	};

	componentDidUpdate() {
		if (this.state.redirected === true) {
			const resetAction = StackActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({ routeName: 'Home' })],
			});
			this.props.navigation.dispatch(resetAction);
		}
	}

	async componentDidMount() {
		let toto = await AsyncStorage.getItem('user');
		if (toto === null) {
			this.props.navigation.navigate('Login');
		}
	}

	render() {
		const user = this.props.user.user;

		console.log(user);
		if (user) {
			return (
				<View>
					<Text>Username: {user.username}</Text>
					<Text>firstname: {user.firstname}</Text>
					<Text>lastname: {user.lastname}</Text>
					<Text>created_at: {user.created_at}</Text>
					<Text>id: {user.id}</Text>

					<Button title='Logout' onPress={this.logout}>
						loggout
					</Button>
				</View>
			);
		} else return <Text>bahbravo</Text>;
	}
}

const mapStateToProps = state => {
	return {
		statusPageToProfile: state.statusPageToProfile,
	};
};

export default connect(mapStateToProps)(ProfilePage);
