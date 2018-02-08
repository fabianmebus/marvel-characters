import Vue from 'vue'

import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Vuex);

import App from './App.vue'
import CharacterSearch from './components/CharacterSearch.vue';
import Character from './components/Character.vue';


// Router
// =================================

const routes = [
  {
    path: '/',
    component: CharacterSearch
  },
  {
    path: '/character/:id',
    component: Character
  }
];

const router = new VueRouter({
  routes: routes
});

// Vux Store
// =================================

const store = new Vuex.Store({
  state: {
    searchInputValue: '',
    characters: {},
    character: {}
  },
  mutations: {
    updateSearchInputValue(state, searchInputValue) {
      state.searchInputValue = searchInputValue;
    },
    updateCharacters(state, charactersResponse) {
      state.characters = charactersResponse;
    },
    updateCharacter(state, characterResponse) {
      state.character = characterResponse;
    }
  },
  actions: {
    updateCharacters({commit, state}) {
      NProgress.start();
      Vue.http
        .get(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${state.searchInputValue}&limit=100&orderBy=name&apikey=3da29d81144b13d6f2596a60732f2efc&ts=1&hash=78cea934912a6a191f4e0ca2fc5e62c4`)
        .then(response => {
          NProgress.done();
          commit('updateCharacters', response.body);
        });
    },
    updateCharacter({commit}, id) {
      NProgress.start();
      Vue.http
        .get(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=3da29d81144b13d6f2596a60732f2efc&ts=1&hash=78cea934912a6a191f4e0ca2fc5e62c4`)
        .then(response => {
          NProgress.done();
          commit('updateCharacter', response.body);
        });
    }
  }
});

// Vue Instance
// =================================

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
});
