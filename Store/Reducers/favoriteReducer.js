// Store/Reducers/favoriteReducer.js

const initialState = { favoritesFilm: [], favoritesProfile: [], statusPageToProfile: '' };

function toggleFavorite(state = initialState, action) {
	console.log('toggleFavorite REDUCER');
	let nextState;
	switch (action.type) {
		case 'TOGGLE_FAVORITE':
			const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id);
			if (favoriteFilmIndex !== -1) {
				// Le film est déjà dans les favoris, on le supprime de la liste
				nextState = {
					...state,
					favoritesFilm: state.favoritesFilm.filter((item, index) => index !== favoriteFilmIndex),
				};
			} else {
				// Le film n'est pas dans les films favoris, on l'ajoute à la liste
				nextState = {
					...state,
					favoritesFilm: [...state.favoritesFilm, action.value],
				};
			}
			return nextState || state;

		case 'TOGGLE_FAVORITE_PROFILE':
			const isEqualName = elem => elem === action.value[0].platformInfo.platformUserId;

			// console.log('isEqualName => ', isEqualName('Asyvasy'));
			// console.log('isEqualName2 => ', isEqualName('Asyvdeasy'));
			// console.log(action.value[0].platformInfo.platformUserId);

			// state.favoritesProfile.forEach(elem => {
			// 	console.log('ELLEM ', elem.platformInfo.platformUserId);
			// 	// elem === action.value[0].platformInfo.platformUserId;
			// });

			let favoriteProfileIndex;

			if (state.favoritesProfile.length > 0) {
				// console.log('pas vide', state.favoritesProfile[0][0].platformInfo.platformUserId);
				// for (elem of state.favoritesProfile[0]) {
				for (let i = 0; i < state.favoritesProfile.length; i++) {
					let elem = state.favoritesProfile[i];
					switch (elem.platformInfo.platformUserId) {
						case action.value[0].platformInfo.platformUserId:
							console.log('trouvé', i);
							favoriteProfileIndex = i;
							break;
						default:
							console.log('pas trouvé');
							favoriteProfileIndex = -1;
					}
				}
			} else {
				console.log('vide');
				favoriteProfileIndex = -1;
			}

			console.log('favoriteProfileIndex => ', favoriteProfileIndex);
			if (favoriteProfileIndex === -1) {
				// Le film n'est pas dans les films favoris, on l'ajoute à la liste
				console.log("Le film n'est pas dans les films favoris, on l'ajoute à la liste");
				nextState = {
					...state,
					favoritesProfile: [...state.favoritesProfile, action.value[0]],
					// test: [...state.test, action.value[0].platformInfo.platformUserId],
				};
			} else {
				// Le film est déjà dans les favoris, on le supprime de la liste
				console.log('Le film est déjà dans les favoris, on le supprime de la liste');

				nextState = {
					...state,
					favoritesProfile: state.favoritesProfile.filter((item, index) => index !== favoriteProfileIndex),
				};
			}

			return nextState || state;

		case 'MANAGE_PROFILE':
			nextState = {
				...state,
				statusPageToProfile: action.value,
			};
			return nextState || state;

		default:
			return state;
	}
}

export default toggleFavorite;
