import Vue from 'vue'

import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

Vue.use(VueResource);
Vue.use(VueRouter);

import App from './App.vue'
import CharacterSearch from './components/CharacterSearch.vue';
import Character from './components/Character.vue';


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


new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
