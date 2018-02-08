<template>
  <div>

    <label for="searchInput">Character Search</label>
    <input v-model="searchInputValue" id="searchInput" type="search" placeholder="e.g. hulk">
    <small>Enter at least 3 letters, results will be automatically shown and updated.</small>

  </div>
</template>

<script>
  export default {
    name: 'character-search-input',
    computed: {
      searchInputValue: {
        get: function () {
          return this.$store.state.searchInputValue;
        },
        set: function (newSearchInputValue) {
          this.$store.commit('updateSearchInputValue', newSearchInputValue);

          if (newSearchInputValue.length >= 3) {
            this.$store.dispatch('updateCharacters');
          }
          else {
            this.$store.commit('updateCharacters', {});
          }
        }
      }
    }
  }
</script>

<style scoped>
  label {
    display: inline-block;
    margin-bottom: 10px;
  }

  ::placeholder {
    color: #ccc;
  }

  input {
    font-size: 24px;
    border: 1px solid;
    padding: 10px;
    width: 100%;
    border-radius: 5px;
    -webkit-appearance: textfield;
  }

  small {
    display: inline-block;
    margin-top: 8px;
    color: #989898;
  }
</style>
