// Components/ProfileApex.js

import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { getImageFromApi } from '../API/TMDBApi';
import FadeIn from '../Animations/FadeIn';
// import { Platform } from '@unimodules/core';
import EnlargeShrink from '../Animations/EnlargeShrink';
import Flag from 'react-native-flags';

class ProfileApex extends React.Component {
	render() {
		const { profile, bool } = this.props;
		let platform;
		let platformSlug;
		if (bool) {
			console.log('platformSlug => ', profile.platformInfo.platformSlug);
			console.log('countryCode => ', profile.segments[1].metadata.name);
			platformSlug = profile.platformInfo.platformSlug;
			switch (platformSlug) {
				case 'psn':
					platform = require('../Images/ic-playstation.png');
					break;
				case 'xb1':
					platform = require('../Images/ic-xbox.png');
					break;
				case 'pc':
					platform = require('../Images/ic-pc.png');
					break;
			}

			return (
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
				</FadeIn>
			);
		} else {
			return <Text style={styles.title_text}> </Text>;
		}
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

export default ProfileApex;
