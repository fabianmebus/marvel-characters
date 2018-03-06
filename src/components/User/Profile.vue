<template>
  <div>

    <header class="header">
      <h1>Profile</h1>
      <!--<button @click="signOut" class="user-action">Sign out</button>-->
    </header>

    <div v-if="user" class="profile-data">
      <div>
        <img height="100" width="100" class="img" :src="user.photoURL" :alt="user.displayName">
      </div>
      <p>
        Welcome to your profile. You are signed in as <b>{{user.displayName}}</b>
      </p>
    </div>


    <p>
    <button @click="signOut" class="user-action">Sign out</button>
    </p>


</div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'profile',
  computed: {
    user() {
      return this.$store.getters.user;
    },
    authenticated() {
      return this.$store.getters.authenticated;
    },
  },
  methods: {
    signOut() {
      firebase.auth().signOut();
    },
    handleAuthentication() {
      if (this.authenticated !== true) {
        this.$router.push('/');
      }
    }
  },
  created() {
    this.handleAuthentication();
  },
  beforeUpdate() {
    this.handleAuthentication();
  },
};
</script>

<style scoped>

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-action,
.user-action:hover {
  /*border-radius: 5px;*/
  /*border: 1px solid #000;*/
  /*background-color: #fff;*/
  /*font-size: 13px;*/
  /*line-height: 30px;*/
  /*padding: 0 5px;*/
  /*color: #000;*/
  /*text-decoration: none;*/
  width: 100%;

  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #303030;
  background-color: #303030;
  font-size: 13px;
  padding: 0 10px;
  color: #fff;
  line-height: 30px;
  cursor: pointer;
}

.profile-data {
  display: flex;
}

.img {
  border-radius: 5px;
  width: 100px;
  height: auto;
  margin-right: 20px;
  border: 1px solid #000;
}

</style>

