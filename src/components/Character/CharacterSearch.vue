<template>
  <div>

    <character-search-input></character-search-input>
    <character-search-result v-if="characters !== null"></character-search-result>

  </div>
</template>

<script>
  import CharacterSearchInput from "./CharacterSearchInput.vue";
  import CharacterSearchResult from "./CharacterSearchResult.vue";

  export default {
    name: 'character-search',
    components: {
      'character-search-input': CharacterSearchInput,
      'character-search-result': CharacterSearchResult
    },
    computed: {
      characters: function () {
        return this.$store.getters.characters;
      }
    }
  };
</script>
