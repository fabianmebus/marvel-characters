<template>
  <div>

    <character-search-input></character-search-input>
    <character-search-result v-if="characters.data"></character-search-result>

  </div>
</template>

<script>
  import CharacterSearchInput from "../components/CharacterSearchInput.vue";
  import CharacterSearchResult from "../components/CharacterSearchResult.vue";

  export default {
    name: 'character-search',
    components: {
      'character-search-input': CharacterSearchInput,
      'character-search-result': CharacterSearchResult
    },
    computed: {
      characters: function () {
        return this.$store.state.characters;
      }
    }
  };
</script>
