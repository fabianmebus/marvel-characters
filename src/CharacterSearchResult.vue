<template>
  <div>

    <p>
      <b>{{characters.data.count}}</b><!-- of <b>{{characters.data.total}}</b> --> search results for "<b>{{query}}</b>"
    </p>

    <div v-if="characters.data.count > 0">
      <ul>
        <li v-for="character in characters.data.results" :key="character.id">
          <character-search-result-item v-bind:character="character"></character-search-result-item>
        </li>
      </ul>
      <small>
        <a href="http://marvel.com">{{characters.attributionText}}</a>
      </small>
    </div>

  </div>
</template>

<script>
  import CharacterSearchResultItem from "./CharacterSearchResultItem.vue";

  export default {
    name: 'character-search-result',
    props: ['characters', 'query'],
    // todo: :key WTF!?
    components: {
      'character-search-result-item': CharacterSearchResultItem
    }
  };
</script>

<style scoped>
  p {
    margin: 40px 0 20px 0;
    font-size: 22px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  small {
    margin-top: 20px;
    display: inline-block;
  }

  a {
    color: #989898;
    text-decoration: none;
  }
</style>
