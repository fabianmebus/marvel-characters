<template>
  <div>

    <h1>Your Favorite Characters</h1>

    <p v-if="favouriteCharacters === false">
      You do not have any favorite characters yet. Add a character to your favorites from the details page of the character.
    </p>

    <div v-else>
      <ol class="favourite-list">
        <li v-for="(item, key) in favouriteCharacters" class="favourite-list__item">
          <router-link :to="`/character/${item.characterId}`" class="link">
            <img class="link__img" :src="item.characterImageURL" :alt="item.characterName">
            <span class="link__text">{{item.characterName}}</span>
          </router-link>
          <button @click="removeFromFavorites(key)">Remove</button>
        </li>
      </ol>

      <small class="attribution">
        <a href="http://marvel.com" class="attribution__link">Data provided by Marvel. © 2018 MARVEL</a>
      </small>
    </div>

  </div>
</template>

<script>
  import firebase from 'firebase';

  export default {
    name: 'favorites',
    computed: {
      authenticated() {
        return this.$store.getters.authenticated;
      },
      user() {
        return this.$store.getters.user;
      },
      favouriteCharacters() {
        return this.$store.getters.favouriteCharacters;
      },
    },

    methods: {
      removeFromFavorites(key) {
        const userId = firebase.auth().currentUser.uid;
        const favouriteCharactersRef = firebase.database().ref(`users/${userId}/favouriteCharacters/${key}`);
        favouriteCharactersRef.remove();
      },
    },

    created() {
      if (this.authenticated === true) {
        this.$store.dispatch('fetchFavouriteCharacters');
      } else {
        this.$router.push('/');
      }
    },
  };
</script>

<style scoped lang="scss">

  .favourite-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .favourite-list__item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;

    &:hover {
      background-color: #ededed;
    }

    &:last-child {
      border-bottom: 0;
    }
  }

  .link {
    font-size: 1em;
    display: flex;
    align-items: center;
    margin-right: 8px;
    color: #000;
    text-decoration: none;
    flex-grow: 1;

    &:hover .link__text {
      text-decoration: underline;
    }
  }

  .link__img {
    margin-right: 8px;
    flex-shrink: 0;
    width: 54px;
    height: 54px;
  }

  button {
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

  .attribution {
    margin-top: 40px;
    display: inline-block;

    &__link {
      color: #989898;
      text-decoration: none;
    }
  }


</style>

