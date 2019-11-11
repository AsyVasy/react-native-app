// Components/ProfileApex.js

import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { getImageFromApi } from '../API/TMDBApi';
import FadeIn from '../Animations/FadeIn';
import { Platform } from '@unimodules/core';
import EnlargeShrink from '../Animations/EnlargeShrink';
import Flag from 'react-native-flags';

class ProfileApex extends React.Component {
	render() {
		const { bool } = this.props;
		let platoformo = 'xb1';
		let platform;
		if (!bool) {
			switch (platoformo) {
				case 'psn':
					platform = require('../Images/ic-playstation.png');
				case 'xb1':
					platform = require('../Images/ic-xbox.png');
				case 'pc':
					platform = require('../Images/ic-pc.png');
			}
			console.log(platform);
			return (
				<FadeIn>
					<TouchableOpacity style={styles.main_container}>
						<View style={styles.avatar_and_flag}>
							<Image
								style={styles.avatar_img}
								source={{ uri: 'https://avatar-cdn.tracker.gg/api/avatar/2/Asyvasy.png' }}
							/>
							<Flag style={styles.country_flag} code="FR" size={24} />
						</View>
						<Text style={styles.title_text}> AsyVasy</Text>
						<Image style={styles.platform_img} source={platform} />

						{/* <Text style={styles.title_text}> {profile.segments[0].stats.level}</Text> */}
						{/* <Text>{profile.platformInfo}</Text> */}
					</TouchableOpacity>
					<Text> Level: 252</Text>
					<Text> Kills: 786</Text>
					<Image
						style={styles.rank_image}
						source={{ uri: 'https://trackercdn.com/cdn/apex.tracker.gg/ranks/apex.png' }}
					/>
					<Text> Score: 5074</Text>
					<Text> Last Character Played: Pathfinder</Text>
					<Image
						style={styles.rank_image}
						source={{ uri: 'https://trackercdn.com/cdn/apex.tracker.gg/legends/pathfinder-tile.png' }}
					/>
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
