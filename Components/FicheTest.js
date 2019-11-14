// Components/ProfileApex.js

import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions, ImageBackground } from 'react-native';
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
				<ImageBackground source={require('../Images/wp-apex1.png')} style={{ width: '100%', height: '100%' }}>
					<Text>Inside</Text>
				</ImageBackground>
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
