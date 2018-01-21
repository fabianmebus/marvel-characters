<template>
  <div class="page">

    <header>
      <h1>Marvel Characters</h1>
    </header>

    <main>
      <character-search-input v-on:queryChanged="handelQueryChange"></character-search-input>
      <character-search-result v-if="characters.length !== 0" v-bind="{'characters': characters, 'query': query}"></character-search-result>
    </main>

    <footer>
      Created with &#9829; and <a href="https://vuejs.org/">Vue.js</a> by <a href="https://fabianmebus.com">Fabian Mebus</a>
    </footer>

  </div>
</template>

<script>
  import CharacterSearchInput from './CharacterSearchInput.vue';
  import CharacterSearchResult from './CharacterSearchResult.vue';

  export default {
    name: 'app',
    components: {
      'character-search-input': CharacterSearchInput,
      'character-search-result': CharacterSearchResult
    },
    data() {
      return {
        query: '',
        characters: []
      };
    },
    methods: {
      handelQueryChange: function (newQuery) {
        if (newQuery.length >= 3) {
          this.query = newQuery;
          // For information about authentication see https://developer.marvel.com/documentation/authorization
          this.$http
            .get(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${newQuery}&limit=100&orderBy=name&apikey=3da29d81144b13d6f2596a60732f2efc&ts=1&hash=78cea934912a6a191f4e0ca2fc5e62c4`)
            .then(response => {
              this.characters = response.body;
            }, error => {
              // todo: provide proper error message
              console.error(error);
            });
        } else {
          this.characters = [];
          this.query = '';
        }
      }
    }
  }
</script>

<style scoped>

  .page {
    padding: 0 20px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
  }

  h1 {
    margin-top: 20px;
    margin-bottom: 30px;
  }

  footer {
    margin-top: 30px;
    border-top: 1px solid;
    padding: 10px 0;
    text-align: center;
    color: #989898;
    font-size: smaller;
  }

  a {
    color: #989898;
    text-decoration: none;
  }

  a:hover {
    color: #000;
    text-decoration: underline;
  }
</style>
