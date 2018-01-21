import Vue from 'vue'

import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

Vue.use(VueResource);
Vue.use(VueRouter);

import App from './App.vue'
// import Search from './components/Search.vue';
import CharacterSearchInput from './components/CharacterSearchInput.vue';
import CharacterSearchResult from './components/CharacterSearchResult.vue';
import Character from './components/Character.vue';


const routes = [
  {
    path: '/',
    // component: Search
    components: {
      default: CharacterSearchResult,
      a: CharacterSearchInput
    }
  },
  {
    path: '/character/:id',
    component: Character
  }
];

const router = new VueRouter({
  routes: routes
});


new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
