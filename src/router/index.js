import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import PageNotFound from '../components/PageNotFound.vue';
import CharacterSearch from '../components/Character/CharacterSearch.vue';
import Character from '../components/Character/Character.vue';
import SignIn from '../components/User/Auth/SignIn.vue';
import Profile from '../components/User/Profile.vue';
import Favorites from '../components/User/Favorites.vue';


const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: CharacterSearch,
    },
    {
      path: '/character/:id',
      name: 'character',
      component: Character,
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignIn,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites,
      meta: {
        requiresAuth: true
      },
    },
    {
      // default route, when none of the above matches
      path: "*",
      name: 'pageNotFound',
      component: PageNotFound
    }
  ]
});

export default router;
