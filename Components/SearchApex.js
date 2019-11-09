// Components/Search.js

import React from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native';
import ProfilApex from './ProfilApex';
import { getFilmsFromApiWithSearchedText, getApexData } from '../API/TMDBApi';
import { connect } from 'react-redux';
import ProfileApex from './ProfilApex';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.searchedText = '';
		this.platform = 'psn';
		this.state = {
			films: [],
			profile: [],
			isLoading: false,
			bool: false,
		};
	}

	async _loadFilms() {
		if (this.searchedText.length > 0) {
			this.setState({ isLoading: true });
			let toto = await getApexData(this.searchedText, this.platform);
			console.log('xsxsxsxs => ');

			this.setState({
				// films: [...this.state.films, ...data.results],
				profile: toto.data,
				isLoading: false,
				bool: true,
			});
			// });
		}
	}

	_searchTextInputChanged(text) {
		this.searchedText = text;
	}

	_searchFilms() {
		this.setState(
			{
				films: [],
				profile: [],
				bool: false,
			},
			() => {
				this._loadFilms();
			}
		);
	}

	// _displayDetailForFilm = idFilm => {
	// 	console.log('Display film with id ' + idFilm);
	// 	this.props.navigation.navigate('FilmDetail', { idFilm: idFilm });
	// };

	_displayLoading() {
		if (this.state.isLoading) {
			return (
				<View style={styles.loading_container}>
					<ActivityIndicator size="large" />
				</View>
			);
		}
	}

	render() {
		console.log('render ');
		// console.log(this.state);
		const profile = this.state.profile;
		return (
			<View style={styles.main_container}>
				<TextInput
					style={styles.textinput}
					placeholder="pseudo"
					onChangeText={text => this._searchTextInputChanged(text)}
					onSubmitEditing={() => this._searchFilms()}
				/>
				<Button title="Rechercher" onPress={() => this._searchFilms()} />
				{/* <FlatList data={this.state.profile} renderItem={({ item }) => <ProfilApex profile={item} />} /> */}
				<ProfilApex profile={this.state.profile} bool={this.state.bool} />
				{/* <FlatList
					data={this.state.films}
					extraData={this.props.favoritesFilm}
					// On utilise la prop extraData pour indiquer à notre FlatList que d’autres données doivent être prises en compte si on lui demande de se re-rendre
					keyExtractor={item => item.id.toString()}
					renderItem={({ item }) => (
						<FilmItem
							film={item}
							// Ajout d'une props isFilmFavorite pour indiquer à l'item d'afficher un 🖤 ou non
							isFilmFavorite={
								this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1 ? true : false
							}
							displayDetailForFilm={this._displayDetailForFilm}
						/>
					)}
					onEndReachedThreshold={0.5}
					onEndReached={() => {
						if (this.page < this.totalPages) {
							// On vérifie également qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
							this._loadFilms();
						}
					}}
				/> */}
				{this._displayLoading()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	main_container: {
		flex: 1,
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
		height: 30
	}
});

// On connecte le store Redux, ainsi que les films favoris du state de notre application, à notre component Search
const mapStateToProps = state => {
	return {
		favoritesFilm: state.favoritesFilm,
	};
};

export default connect(mapStateToProps)(Search);
