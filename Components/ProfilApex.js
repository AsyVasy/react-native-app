// Components/ProfileApex.js

import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions, Button } from 'react-native';
import { getImageFromApi } from '../API/TMDBApi';
import FadeIn from '../Animations/FadeIn';
// import { Platform } from '@unimodules/core';
import EnlargeShrink from '../Animations/EnlargeShrink';
import Flag from 'react-native-flags';
import { connect } from 'react-redux';

class ProfileApex extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			profile: undefined,
			isLoading: false,
		};

		// Ne pas oublier de binder la fonction _shareFilm sinon, lorsqu'on va l'appeler depuis le headerRight de la navigation, this.state.film sera undefined et fera planter l'application
		this._toggleFavorite = this._toggleFavorite.bind(this);
	}

	_displayFavoriteImage (profile) {
		var sourceImage = require('../Images/ic_favorite_border.png');
		var shouldEnlarge = false; // Par défaut, si le film n'est pas en favoris, on veut qu'au clic sur le bouton, celui-ci s'agrandisse => shouldEnlarge à true

		let favo = this.props.favoritesProfile;
		let actuProfile = profile.platformInfo.platformUserId;

		if (favo.find(item => item.platformInfo.platformUserId === actuProfile) !== undefined) {
			sourceImage = require('../Images/ic_favorite.png');
			shouldEnlarge = true; // Si le film est dans les favoris, on veut qu'au clic sur le bouton, celui-ci se rétrécisse => shouldEnlarge à false
		}
		return (
			<EnlargeShrink shouldEnlarge={shouldEnlarge}>
				<Image style={styles.favorite_image} source={sourceImage} />
			</EnlargeShrink>
		);
	}

	_toggleFavorite () {
		const action = { type: 'TOGGLE_FAVORITE_PROFILE', value: [this.props.profile] };
		this.props.dispatch(action);
	}

	_getProfile () {
		let bool
		if (this.props.navigation.state.params.bool) bool = this.props.navigation.state.params.bool
		else if (this.props.bool) bool = this.props.bool
		else bool = false
	}

	_displayProfileOrNot (bool, profile) {
		let platform;
		let platformSlug;
		let displayProfile

		if (bool && profile) {
			platformSlug = profile.platformInfo.platformSlug;
			switch (platformSlug) {
				case 'psn':
					platform = require('../Images/ic-playstation.png');
					break;
				case 'xbl':
					platform = require('../Images/ic-xbox.png');
					break;
				case 'origin':
					platform = require('../Images/ic-pc.png');
					break;
			}

			displayProfile = (
				<FadeIn>
					<TouchableOpacity style={styles.main_container}>
						<View style={styles.avatar_and_flag}>
							<Image style={styles.avatar_img} source={{ uri: profile.platformInfo.avatarUrl }} />
							<Flag style={styles.country_flag} code={profile.userInfo.countryCode} size={24} />
						</View>
						<Text style={styles.title_text}> {profile.platformInfo.platformUserId}</Text>
						<Image style={styles.platform_img} source={platform} />

						{/* <Text style={styles.title_text}> {profile.segments[0].stats.level}</Text> */}
						{/* <Text>{profile.platformInfo}</Text> */}
					</TouchableOpacity>
					<Text> Level: {profile.segments[0].stats.level.displayValue}</Text>
					<Text> Kills: {profile.segments[0].stats.kills.displayValue}</Text>
					<Image
						style={styles.rank_image}
						source={{ uri: profile.segments[0].stats.rankScore.metadata.iconUrl }}
					/>
					<Text> rank: #{profile.segments[0].stats.rankScore.rank}</Text>
					<Text> Score: {profile.segments[0].stats.rankScore.displayValue}</Text>
					<Text> Last Character Played: {profile.segments[1].metadata.name}</Text>
					<Image style={styles.rank_image} source={{ uri: profile.segments[1].metadata.imageUrl }} />
					<TouchableOpacity style={styles.favorite_container} onPress={() => this._toggleFavorite()}>
						{this._displayFavoriteImage(profile)}
					</TouchableOpacity>
				</FadeIn>)

		}
		else {
			displayProfile = (
				<View>


					<Button title='bool' onPress={() => console.log(this.props.bool)} />
					<Button title='bool' onPress={() => console.log(this.props.navigation.state.params.bool)} />
					<Button title='favoritesFilm' onPress={() => console.log(this.props.favoritesFilm)} />
					<Button title='favoritesProfile' onPress={() => console.log(this.props.favoritesProfile)} />
					<Button title='isFavoritesProfile' onPress={() => console.log(this.props.isFavoritesProfile)} />
					<Button title='profile' onPress={() => console.log(this.props.profile)} />
					<Button title='profile' onPress={() => console.log(this.props.navigation.state.params.profile)} />
				</View>
			)


		}

		return displayProfile
	}

	render () {
		console.log('rendre profile')
		// const { profile, bool } = this.props
		let bool
		if (this.props.navigation) bool = this.props.navigation.state.params.bool
		else if (this.props.bool) bool = this.props.bool
		else bool = false

		let profile
		if (this.props.navigation) {
			console.log('lala 1')
			profile = this.props.navigation.state.params.profile
		}
		else if
			(this.props.profile) {
			profile = this.props.profile
			console.log('lala 2', profile)

		}
		else {
			console.log('lala 3')
			profile = false

		}

		return this._displayProfileOrNot(bool, profile)



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

// On connecte le store Redux, ainsi que les films favoris du state de notre application, à notre component Search
const mapStateToProps = state => {
	return {
		favoritesFilm: state.favoritesFilm,
		favoritesProfile: state.favoritesProfile,
	};
};

export default connect(mapStateToProps)(ProfileApex);
