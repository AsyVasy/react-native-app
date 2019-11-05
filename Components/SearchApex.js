// import React from 'react';
// import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
// import { getApexData } from '../API/TMDBApi';

// class SearchApex extends React.Component {

//   constructor(props) {
//     super(props);
//     this.searchedText = '';
//     this.platform = 'psn';
//     this.profile;
//     this.state = {
//       films: [],
//       isLoading: false,
//     };
//     this._loadFilms = this._loadFilms.bind(this);
//   }

//   _loadFilms () {
//     if (this.searchedText.length > 0) {
//       this.setState({ isLoading: true });
//       getApexData(this.searchedText, this.platform).then(data => {
//         this.profile = data;
//         // this.setState({
//         //   films: [...this.state.films, ...data.data],
//         //   isLoading: false,
//         // });
//       });
//     }
//   }

//   _searchTextInputChanged (text) {
//     this.searchedText = text;
//   }


//   _searchFilms () {
//     this.setState(
//       {
//         films: [],
//       },
//       () => {
//         this._loadFilms();
//       }
//     );
//   }

//   _displayLoading () {
//     if (this.state.isLoading) {
//       return (
//         <View style={styles.loading_container}>
//           <ActivityIndicator size="large" />
//         </View>
//       );
//     }
//   }


//   render () {
//     return (
//       <SafeAreaView>
//         <View >
//           <TextInput

//             placeholder="Profile"
//             onChangeText={text => this._searchTextInputChanged(text)}
//             onSubmitEditing={() => this._searchFilms()}
//           />
//           <Button title="Rechercher" onPress={() => this._searchFilms()} />
//           {this._displayLoading()}
//         </View>
//       </SafeAreaView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   main_container: {
//     flex: 1,
//   },
//   textinput: {
//     marginLeft: 5,
//     marginRight: 5,
//     height: 50,
//     borderColor: '#000000',
//     borderWidth: 1,
//     paddingLeft: 5,
//   },
//   loading_container: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 100,
//     bottom: 0,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default SearchApex
