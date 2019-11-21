// Components/FavoriteList.js

import React from 'react';
import { StyleSheet, FlatList, Text, View, Button, SafeAreaView, TouchableOpacity } from 'react-native';
// import FilmItem from './FilmItem';
import ProfileApex from './ProfilApex';

import { connect } from 'react-redux';

function Item({ title, profile, navigation }) {
	return (
		<TouchableOpacity
			style={styles.item}
			onPress={() => navigation.navigate('ProfileApex', { profile: profile, bool: true })}>
			<Text style={styles.title}>{title}</Text>
		</TouchableOpacity>
	);
}

class FavoriteList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			films: [],
		};
	}

	// _displayDetailForFilm = (idFilm) => {
	//   console.log("Display film " + idFilm)
	//   // On a récupéré les informations de la navigation, on peut afficher le détail du film
	//   this.props.navigation.navigate('FilmDetail', { idFilm: idFilm })
	// }

	_test() {
		let toto = this.props.favoritesProfile;
		if (toto) toto.forEach(elem => console.log(elem.platformInfo));
		else console.log('pas toto');
	}

	render() {
		const navigation = this.props.navigation;
		return (
			// <View>

			// 	<FlatList
			// 		style={styles.list}
			// 		data={this.props.favoritesProfile}
			// 		keyExtractor={item => item.platformInfo.platformUserId.toString()}
			// 		renderItem={({ item }) => <Text>AAAAA</Text>}
			// 	/>
			// </View>

			<SafeAreaView style={styles.container}>
				<FlatList
					data={this.props.favoritesProfile}
					keyExtractor={item => item.platformInfo.platformUserId}
					renderItem={({ item }) => (
						<Item title={item.platformInfo.platformUserId} profile={item} navigation={navigation} />
					)}
				/>
			</SafeAreaView>

			// <SafeAreaView style={styles.container}>
			// 	<Button title='Favoris' onPress={() => this._test()} />
			// 	<FlatList
			// 		data={this.props.favoritesProfile}
			// 		renderItem={({ item }) => <Item title={item.platformInfo.platformUserId} />}
			// 		keyExtractor={item => item.platformInfo.platformUserId}
			// 		extraData={selected}
			// 	/>
			// </SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	item: {
		backgroundColor: '#f9c2ff',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 32,
	},
});

const mapStateToProps = state => {
	return {
		favoritesFilm: state.favoritesFilm,
		favoritesProfile: state.favoritesProfile,
		test: state.test,
	};
};

export default connect(mapStateToProps)(FavoriteList);
