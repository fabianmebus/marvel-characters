<template>
  <div>
    <h1>Sign in</h1>
    <button class="user-action" @click="signIn">Sign in</button>
  </div>
</template>

<script>
  export default {
    name: 'signIn',
    computed: {
      authenticated() {
        return this.$store.getters.authenticated;
      },
    },
    methods: {
      signIn() {
        this.$store.dispatch('signInWithGoogle');
      },
    },
    created() {
      if (this.authenticated === true) {
        this.$router.push('/');
      }
    },
  }
</script>

<style scoped>

  .user-action,
  .user-action:hover {
    /*border-radius: 5px;*/
    /*border: 1px solid #000;*/
    /*background-color: #fff;*/
    /*font-size: 13px;*/
    /*line-height: 30px;*/
    /*padding: 0 10px;*/
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

</style>
