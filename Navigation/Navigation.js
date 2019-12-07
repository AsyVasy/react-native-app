// Navigation/Navigation.js

import React from 'react'; // N'oubliez pas l'import de React ici. On en a besoin pour rendre nos components React Native Image !
import { StyleSheet, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Search from '../Components/Search';
import FilmDetail from '../Components/FilmDetail';
import Favorites from '../Components/Favorites';
import Test from '../Components/Test';
import Login from '../Components/Login';
import FicheTest from '../Components/FicheTest';
import SearchApex from '../Components/SearchApex';
import ProfilApex from '../Components/ProfilApex';

// const SearchStackNavigator = createStackNavigator({
// 	Search: {
// 		screen: Search,
// 		navigationOptions: {
// 			title: 'Rechercher',
// 		},
// 	},
// 	FilmDetail: {
// 		screen: FilmDetail,
// 	},
// });

const SearchApexStackNavigator = createStackNavigator({
	Home: {
		screen: SearchApex,
		navigationOptions: {
			title: 'Home',
		},
	},
});

const TestStackNavigator = createStackNavigator({
	MyApexFavo: {
		screen: FicheTest,
		navigationOptions: {
			title: 'My Favorites Legends',
		},
	},
	ProfileApex: {
		screen: ProfilApex,
	},
});
const LoginStackNavigator = createStackNavigator({
	LoginPage: {
		screen: Login,
		navigationOptions: {
			title: 'Login',
		},
	},

});

const MoviesTabNavigator = createBottomTabNavigator(
	{
		// Search: {
		// 	screen: SearchStackNavigator,
		// 	navigationOptions: {
		// 		tabBarIcon: () => {
		// 			// On définit le rendu de nos icônes par les images récemment ajoutés au projet
		// 			return <Image source={require('../Images/ic_search.png')} style={styles.icon} />; // On applique un style pour les redimensionner comme il faut
		// 		},
		// 	},
		// },
		// Favorites: {
		// 	screen: Favorites,
		// 	navigationOptions: {
		// 		tabBarIcon: () => {
		// 			return <Image source={require('../Images/ic_favorite.png')} style={styles.icon} />;
		// 		},
		// 	},
		// },

		Login: {
			screen: LoginStackNavigator,
			navigationOptions: {
				tabBarIcon: () => {
					return <Image source={require('../Images/ic-apex-legends.png')} style={styles.icon} />;
				},
			},
		},
		Apex: {
			screen: SearchApexStackNavigator,
			navigationOptions: {
				tabBarIcon: () => {
					return <Image source={require('../Images/ic-apex-legends.png')} style={styles.icon} />;
				},
			},
		},
		Test: {
			screen: TestStackNavigator,
			navigationOptions: {
				tabBarIcon: () => {
					return <Image source={require('../Images/ic-playstation.png')} style={styles.icon} />;
				},
			},
		},
	},
	{
		tabBarOptions: {
			activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
			inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
			showLabel: false, // On masque les titres
			showIcon: true, // On informe le TabNavigator qu'on souhaite afficher les icônes définis
		},
	}
);

const styles = StyleSheet.create({
	icon: {
		width: 50,
		height: 50,
	},
});

export default createAppContainer(MoviesTabNavigator);
