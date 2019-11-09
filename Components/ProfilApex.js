// Components/ProfileApex.js

import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { getImageFromApi } from '../API/TMDBApi';
import FadeIn from '../Animations/FadeIn';
import { Platform } from '@unimodules/core';
import EnlargeShrink from '../Animations/EnlargeShrink';

class ProfileApex extends React.Component {
	render() {
		const { profile, bool } = this.props;
		let platform;
		if (bool) {
			console.log('prorpo => ', profile.platformInfo.avatarUrl);

			switch (profile.platformInfo.platformSlug) {
				case 'psn':
					platform = '../Images/playstation-brands.svg';
				case 'xb1':
					platform = '../Images/xbox-brands.svg';
				case 'pc':
					platform = '../Images/windows-brands.svg';
			}

			return (
				<FadeIn>
					<TouchableOpacity style={styles.main_container}>
						<Image style={styles.share_image} source={require('../Images/ic-playstation.png')} />
						<Image style={styles.image} source={{ uri: profile.platformInfo.avatarUrl }} />
						<Text style={styles.title_text}> {profile.platformInfo.platformUserId}</Text>
						<Text style={styles.title_text}> {profile.userInfo.countryCode}</Text>
						{/* <Text>{profile.platformInfo}</Text> */}
					</TouchableOpacity>
				</FadeIn>
			);
		} else {
			return <Text style={styles.title_text}> </Text>;
		}
	}
}

const styles = StyleSheet.create({
	main_container: {
		height: 190,
		flexDirection: 'row',
	},
	image: {
		width: 120,
		height: 180,
		margin: 5,
	},
	content_container: {
		flex: 1,
		margin: 5,
	},
	header_container: {
		flex: 3,
		flexDirection: 'row',
	},
	title_text: {
		fontWeight: 'bold',
		fontSize: 20,
		flex: 1,
		flexWrap: 'wrap',
		paddingRight: 5,
	},
	vote_text: {
		fontWeight: 'bold',
		fontSize: 26,
		color: '#666666',
	},
	description_container: {
		flex: 7,
	},
	description_text: {
		fontStyle: 'italic',
		color: '#666666',
	},
	date_container: {
		flex: 1,
	},
	date_text: {
		textAlign: 'right',
		fontSize: 14,
	},
	favorite_image: {
		width: 25,
		height: 25,
		marginRight: 5,
	},
	share_image: {
		width: 30,
		height: 30,
	},
});

export default ProfileApex;
