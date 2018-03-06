import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase'

Vue.use(Vuex);

const store = new Vuex.Store({

  state: {
    searchInputValue: null,
    characters: null,
    character: null,
    user: null,
    authenticated: null,
    isFavorite: null,
    favouriteCharacters: null,
  },

  getters: {
    searchInputValue: state => state.searchInputValue,
    characters: state => state.characters,
    character: state => state.character,
    user: state => state.user,
    authenticated: state => state.authenticated,
    isFavorite: state => state.isFavorite,
    favouriteCharacters: state => state.favouriteCharacters,
  },

  mutations: {
    setSearchInputValue(state, searchInputValue) {
      state.searchInputValue = searchInputValue;
    },
    setCharacters(state, charactersResponse) {
      state.characters = charactersResponse;
    },
    setCharacter(state, characterResponse) {
      state.character = characterResponse;
    },
    setUser(state, user) {
      state.user = user;
    },
    setAuthenticated(state, authenticated) {
      state.authenticated = authenticated;
    },
    setIsFavorite(state, isFavorite) {
      state.isFavorite = isFavorite;
    },
    setFavouriteCharacters(state, favouriteCharacters) {
      state.favouriteCharacters = favouriteCharacters;
    },
  },

  actions: {
    fetchCharacters({commit, state}) {
      NProgress.start();
      Vue.http
        .get(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${state.searchInputValue}&limit=100&orderBy=name&apikey=3da29d81144b13d6f2596a60732f2efc&ts=1&hash=78cea934912a6a191f4e0ca2fc5e62c4`)
        .then(response => {
          NProgress.done();
          commit('setCharacters', response.body);
        });
    },

    fetchCharacter({commit}, id) {
      NProgress.start();
      Vue.http
        .get(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=3da29d81144b13d6f2596a60732f2efc&ts=1&hash=78cea934912a6a191f4e0ca2fc5e62c4`)
        .then(response => {
          NProgress.done();
          commit('setCharacter', response.body);
        });
    },

    signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },

    onAuthStateChanged({commit}) {

      NProgress.start();

      const onAuthStateChangedPromise = new Promise((resolve) => {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            resolve(user);
          } else {
            commit('setUser', null);
            store.commit('setAuthenticated', false);
            NProgress.done();
          }
        });
      });

      onAuthStateChangedPromise
        .then(user => {
          commit('setUser', user);
          commit('setAuthenticated', true);
          NProgress.done();
        })
        .catch(error => {
          commit('setAuthenticated', false);
          NProgress.done();
          console.error(error);
        });
    },

    isFavorite({commit, state}, characterId) {

      const ref = firebase.database().ref(`users/${state.user.uid}/favouriteCharacters`);

      ref.orderByChild('characterId').equalTo(parseInt(characterId)).once('value')
        .then(function (snapshot) {

          if (snapshot.val() === null) {
            commit('setIsFavorite', false);
          } else {
            commit('setIsFavorite', true);
          }
        });
    },

    fetchFavouriteCharacters({commit, state}) {

      NProgress.start();

      const ref = firebase.database().ref(`users/${state.user.uid}/favouriteCharacters`);

      ref.on('value', function (snapshot) {
        if (snapshot.val() === null) {
          commit('setFavouriteCharacters', false);
        } else {
          commit('setFavouriteCharacters', snapshot.val());
        }
        NProgress.done();
      });
    },
  },
});


export default store;
