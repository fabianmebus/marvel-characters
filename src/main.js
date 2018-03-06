import Vue from 'vue'
import VueResource from 'vue-resource';
import router from './router';
import store from './store';
import firebase from 'firebase'
import {firebaseConfig} from './config/firebaseConfig'
import App from './components/App.vue'
import Container from './components/Shared/Container.vue'

Vue.use(VueResource);

Vue.component('app-container', Container);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App),
  beforeCreate() {
    firebase.initializeApp(firebaseConfig);
    store.dispatch('onAuthStateChanged');
  },
});
