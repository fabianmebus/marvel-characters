<template>
  <div>

    <router-link class="link" v-bind:to="`/`">< back to search</router-link>

    <h2>{{character.name}}</h2>

    <img v-bind:src="character.thumbnail.path + '/portrait_incredible.' + character.thumbnail.extension" v-bind:alt="character.name">
    <p>{{character.description}}</p>

    <p><b>{{character.comics.available}}</b> comics available</p>
  </div>
</template>

<script>
  export default {
    name: 'character',
    data() {
      return {
        character: []
      };
    },
    created: function () {
      // For information about authentication see https://developer.marvel.com/documentation/authorization
      this.$http
        .get(`https://gateway.marvel.com:443/v1/public/characters/${this.$route.params.id}?apikey=3da29d81144b13d6f2596a60732f2efc&ts=1&hash=78cea934912a6a191f4e0ca2fc5e62c4`)
        .then(response => {
          console.log(response.body);
          this.character = response.body.data.results[0];
        }, error => {
          // todo: provide proper error message
          console.error(error);
        });
    }
  };
</script>

<style scoped>
  .link {
    color: #000;
    text-decoration: none;
  }
  .link:hover {
    text-decoration: underline;
  }

  /*div {*/
  /*display: flex;*/
  /*flex-wrap: nowrap;*/
  /*padding: 8px 0;*/
  /*}*/

  /*img {*/
  /*width: 65px;*/
  /*height: 45px;*/
  /*margin-right: 10px;*/
  /*flex-shrink: 0;*/
  /*}*/
</style>
