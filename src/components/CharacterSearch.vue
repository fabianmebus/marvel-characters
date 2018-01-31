<template>

  <div>
    <character-search-input
      v-bind:oldQuery="query"
      v-on:queryChanged="handelQueryChange"></character-search-input>
    <character-search-result
      v-if="characters.length !== 0"
      v-bind="{'characters': characters, 'query': query}"></character-search-result>
  </div>

</template>

<script>
  import CharacterSearchInput from "../components/CharacterSearchInput.vue";
  import CharacterSearchResult from "../components/CharacterSearchResult.vue";

  export default {
    name: 'character-search',
    props: ['query', 'characters'],
    components: {
      'character-search-input': CharacterSearchInput,
      'character-search-result': CharacterSearchResult
    },
    methods: {
      handelQueryChange: function (newQuery) {
        this.$emit('queryChanged', newQuery);
      }
    }
  };
</script>
