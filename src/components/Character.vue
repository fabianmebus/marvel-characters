<template>
  <div>

    <router-link class="link" to="/">< back to search</router-link>

    <div v-if="characterDataReady">
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
    data() {
      return {
        character: [],
        characterDataReady: false
      };
    },
    created: function () {
      // For information about authentication see https://developer.marvel.com/documentation/authorization
      this.$http
        .get(`https://gateway.marvel.com:443/v1/public/characters/${this.$route.params.id}?apikey=3da29d81144b13d6f2596a60732f2efc&ts=1&hash=78cea934912a6a191f4e0ca2fc5e62c4`)
        .then(response => {
          this.character = response.body;
          this.characterDataReady = true;
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
