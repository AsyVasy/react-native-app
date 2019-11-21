// Components/Search.js

import React from 'react';
import {
	StyleSheet,
	View,
	TextInput,
	Picker,
	Text,
	FlatList,
	ActivityIndicator,
	ScrollView,
	Modal,
	TouchableHighlight,
	Image,
	Button,
	TouchableOpacity,
} from 'react-native';
// import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfilApex from './ProfilApex';
import { getFilmsFromApiWithSearchedText, getApexData } from '../API/TMDBApi';
import { connect } from 'react-redux';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.searchedText = '';
		// this.platform = 'psn';
		this.state = {
			platform: 'psn',
			films: [],
			profile: [],
			isLoading: false,
			bool: false,
			modalVisible: false,
		};
	}

	static navigationOptions = ({ navigation }) => {
		// const { params } = navigation;
		// On accède à la fonction shareFilm et au film via les paramètres qu'on a ajouté à la navigation
		return {
			// On a besoin d'afficher une image, il faut donc passe par une Touchable une fois de plus
			headerRight: (
				<TouchableOpacity
					style={styles.share_touchable_headerrightbutton}
					onPress={() => console.log('GO PROFILE')}>
					<Image style={styles.share_image} source={require('../Images/ic-profile.png')} />
				</TouchableOpacity>
			),
			headerLeft: (
				<TouchableOpacity
					style={styles.share_touchable_headerrightbutton}
					onPress={() => {
						const toto = navigation.getParam('getSearchModal');
						toto(true);
						// params.setModalVisible(true);
					}}>
					<Image style={styles.share_image} source={require('../Images/ic_search.png')} />
				</TouchableOpacity>
			),
		};
		// }
	};

	componentWillMount() {
		// this.setModalVisible = this.setModalVisible.bind(this);
		this.props.navigation.setParams({ getSearchModal: this._setModalVisible });
	}

	_setModalVisible = visible => {
		this.setState({ modalVisible: visible });
	};

	async _loadFilms() {
		if (this.searchedText.length > 0) {
			this.setState({ isLoading: true });
			let toto = await getApexData(this.searchedText, this.state.platform);

			this.setState({
				// films: [...this.state.films, ...data.results],
				profile: toto.data,
				isLoading: false,
				bool: true,
			});
			// });
		}
	}

	_updatePlatform = platform => {
		this.setState({ platform: platform });
	};

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
		this._setModalVisible(!this.state.modalVisible);
	}

	// _displayDetailForFilm = idFilm => {
	// 	console.log('Display film with id ' + idFilm);
	// 	this.props.navigation.navigate('FilmDetail', { idFilm: idFilm });
	// };

	_displayLoading() {
		if (this.state.isLoading) {
			return (
				<View style={styles.loading_container}>
					<ActivityIndicator size='large' />
				</View>
			);
		}
	}

	render() {
		const navigation = this.props.navigation;
		return (
			<View style={styles.main_container}>
				<ScrollView>
					{this._displayLoading()}
					<Text>Search for a profil </Text>
					<Modal
						animationType='slide'
						transparent={false}
						visible={this.state.modalVisible}
						onRequestClose={() => {
							Alert.alert('Modal has been closed.');
						}}>
						<View style={{ marginTop: 22 }}>
							<TextInput
								style={styles.textinput}
								placeholder='pseudo'
								onChangeText={text => this._searchTextInputChanged(text)}
								onSubmitEditing={() => this._searchFilms()}
							/>
							<Picker
								selectedValue={this.state.platform}
								onValueChange={this._updatePlatform}
								// style={{ height: 10, width: 100 }}
								itemStyle={{ backgroundColor: 'grey', fontSize: 17 }}>
								<Picker.Item label='psn' value='psn' />
								<Picker.Item label='xb1' value='xb1' />
								<Picker.Item label='pc' value='pc' />
							</Picker>
							<Button title='Rechercher' onPress={() => this._searchFilms()} />

							<TouchableHighlight
								onPress={() => {
									this._setModalVisible(!this.state.modalVisible);
								}}>
								<Text>Hide Modal</Text>
							</TouchableHighlight>
						</View>
					</Modal>

					<ProfilApex
						profile={this.state.profile}
						isFavoritesProfile={this.props.favoritesProfile}
						// isFavoritesProfile={this.props.favoritesProfile.findIndex(profile => profile.id === item.id) !== -1 ? true : false}
						bool={this.state.bool}
					/>
				</ScrollView>
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
	};
};

export default connect(mapStateToProps)(Search);
