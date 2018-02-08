<template>
  <div>

    <router-link class="link" to="/">< back to search</router-link>

    <div v-if="character.data">
      <h2>{{character.data.results[0].name}}</h2>

      <div class="info">

        <img v-bind:src="character.data.results[0].thumbnail.path + '/portrait_incredible.' + character.data.results[0].thumbnail.extension"
             v-bind:alt="character.data.results[0].name">

        <div class="info-text">
          <h3 class="h-description">Description</h3>
          <p>{{character.data.results[0].description.trim() || 'No description available.'}}</p>

          <h3>Comics</h3>
          <p><b>{{character.data.results[0].comics.available}}</b> comics available</p>
        </div>
      </div>

      <small>
        <a v-bind:href="character.data.results[0].urls[0].url || 'http://marvel.com'">{{character.attributionText}}</a>
      </small>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'character',
    computed: {
      character: function () {
        return this.$store.state.character;
      }
    },
    beforeCreate: function () {
      this.$store.dispatch('updateCharacter', this.$route.params.id);
    },
    destroyed: function () {
      this.$store.commit('updateCharacter', {});
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

  .info {
    display: flex;
    flex-wrap: wrap;
  }

  .info-text {
    width: 100%;
  }

  img {
    width: 216px;
    height: 324px;
    flex-shrink: 0;
    background-color: #ccc;
  }

  small {
    margin-top: 20px;
    display: inline-block;
  }

  a {
    color: #989898;
    text-decoration: none;
  }

  @media (min-width: 500px) {

    .info {
      flex-wrap: nowrap;
      justify-content: flex-start;
    }

    .h-description {
      margin-top: 0;
    }

    img {
      margin-right: 30px;
    }

  }
</style>
