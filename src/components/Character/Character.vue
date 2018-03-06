<template>
  <div>

    <div v-if="character !== null">
      <h2>{{character.name}}</h2>

      <div class="info">

        <img :src="characterImageURL" :alt="character.name">

        <div class="info-text">

          <h3 class="h-description">Description</h3>
          <p>{{character.description.trim() || 'No description available.'}}</p>

          <h3>Comics</h3>
          <p><b>{{character.comics.available}}</b> comics available</p>

          <h3>Favorites</h3>
          <p v-if="authenticated === true">

            <button v-if="isFavorite === false" @click="addToFavorites()">Add to Favorites</button>
            <span v-if="isFavorite === true">
              You <span v-if="!justAddedToFavorites">already</span> added <b>{{character.name}}</b> to your
              <router-link to="/favorites" class="link">list of favorite characters.</router-link>
            </span>
          </p>
          <p v-else>
            <router-link to="/sign-in" class="link">Sign in</router-link>
            to add <b>{{character.name}}</b> to your list of favorite characters.
          </p>
        </div>
      </div>

      <small>
        <a :href="character.urls[0].url || 'http://marvel.com'">{{attributionText}}</a>
      </small>
    </div>

  </div>
</template>

<script>
  import firebase from 'firebase';

  export default {
    name: 'character',

    data() {
      return {
        justAddedToFavorites: false,
      }
    },

    computed: {

      authenticated() {
        return this.$store.getters.authenticated;
      },

      attributionText() {
        return this.$store.getters.character.attributionText;
      },

      character() {
        if (this.$store.getters.character !== null) {
          return this.$store.getters.character.data.results[0];
        } else {
          return null;
        }
      },

      characterImageURL() {
        return this.character.thumbnail.path + '/portrait_incredible.' + this.character.thumbnail.extension;
      },

      user() {
        return this.$store.getters.user;
      },

      isFavorite() {
        return this.$store.getters.isFavorite;
      },

    },

    methods: {
      addToFavorites() {
        const favouriteCharactersRef = firebase.database().ref(`users/${this.user.uid}/favouriteCharacters`);
        const newFavouriteCharacter = favouriteCharactersRef.push();
        newFavouriteCharacter.set({
          characterId: this.character.id,
          characterName: this.character.name,
          characterImageURL: this.character.thumbnail.path + '/standard_fantastic.' + this.character.thumbnail.extension,
        });
        this.justAddedToFavorites = true;
        this.$store.commit('setIsFavorite', true);
      },
    },

    beforeCreate() {
      this.$store.dispatch('fetchCharacter', this.$route.params.id);
    },

    created() {
      if (this.authenticated === true) {
        this.$store.dispatch('isFavorite', this.$route.params.id);
      }
    },

    destroyed() {
      this.$store.commit('setCharacter', null);
      this.$store.commit('setIsFavorite', null);
    },

  };
</script>

<style scoped>
  .link {
    color: #000;
    text-decoration: underline;
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

  button {
    border-radius: 5px;
    border: 1px solid #303030;
    background-color: #303030;
    font-size: 13px;
    padding: 0 5px;
    color: #fff;
    width: 100%;
    line-height: 30px;
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
