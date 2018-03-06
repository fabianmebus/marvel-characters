<template>
  <section>

    <header class="header">
      <h2 class="header__headline">
        <b>{{characters.data.count}}</b> search results for "<b>{{searchInputValue}}</b>"
      </h2>
    </header>

    <div v-if="characters.data.count > 0">

      <ul class="list">
        <li class="list__item" v-for="character in characters.data.results" :key="character.id">

          <character-search-result-item :character="character"></character-search-result-item>

        </li>
      </ul>

      <footer class="footer">
        <a class="footer__link" href="http://marvel.com">{{characters.attributionText}}</a>
      </footer>

    </div>

  </section>
</template>

<script>
  import CharacterSearchResultItem from "./CharacterSearchResultItem.vue";

  export default {
    name: 'character-search-result',
    components: {
      'character-search-result-item': CharacterSearchResultItem
    },
    computed: {
      searchInputValue: function () {
        return this.$store.getters.searchInputValue;
      },
      characters: function () {
        return this.$store.getters.characters;
      }
    }
  };
</script>

<style scoped>

  .header {
    margin: 40px 0 20px 0;
  }

  .header__headline {
    margin: 0;
    font-size: 22px;
    font-weight: normal;
  }

  .list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    margin: -10px;
  }

  .list__item {
    width: 50%;
    padding: 10px;
  }

  .footer {
    margin-top: 20px;
  }

  .footer__link {
    font-size: 13px;
    color: #989898;
    text-decoration: none;
  }

  @media (min-width: 400px) {

    .list__item {
      max-width: 33%;
    }
  }

  @media (min-width: 590px) {

    .list__item {
      max-width: 25%;
    }
  }
</style>
