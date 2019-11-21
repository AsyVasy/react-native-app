// Components/FavoriteProfile.js

import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions, ImageBackground } from 'react-native';
import { getImageFromApi } from '../API/TMDBApi';
import FadeIn from '../Animations/FadeIn';
import { Platform } from '@unimodules/core';
import EnlargeShrink from '../Animations/EnlargeShrink';
import Flag from 'react-native-flags';
import { connect } from 'react-redux';
import FavoriteList from './FavoriteList';

class FavoriteProfile extends React.Component {
	render() {
		return <FavoriteList profile={this.props.favoritesProfile} navigation={this.props.navigation} />;
	}
}

const styles = StyleSheet.create({
	main_container: {
		// height: 190,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		// borderWidth: 2,
	},
	avatar_and_flag: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	country_flag: {
		marginRight: 5,
	},
	avatar_img: {
		width: 70,
		height: 70,
		// margin: 5,
		borderWidth: 2,
		borderRadius: 40,
	},
	rank_image: {
		width: 70,
		height: 70,
		// margin: 5,
		// borderWidth: 2,
		// borderRadius: 40,
	},
	content_container: {
		flex: 1,
		margin: 5,
	},

	title_text: {
		fontWeight: 'bold',
		fontSize: 20,
		// flex: 1,
		flexWrap: 'wrap',
		// paddingRight: 5,
	},

	platform_img: {
		width: 30,
		height: 30,
	},
});

// export default FavoriteProfile;

// On connecte le store Redux, ainsi que les films favoris du state de notre application, à notre component Search
const mapStateToProps = state => {
	console.log('mapstatetoprops favoriteProfile');
	return {
		favoritesFilm: state.favoritesFilm,
		favoritesProfile: state.favoritesProfile,
	};
};

export default connect(mapStateToProps)(FavoriteProfile);
