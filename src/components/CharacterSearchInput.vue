<template>
  <div>
    <label for="searchInput">Character Search</label>
    <input v-model="inputQuery" id="searchInput" type="search" placeholder="e.g. hulk">
    <small>Enter at least 3 letters, results will be automatically shown and updated.</small>
  </div>
</template>

<script>
  export default {
    name: 'character-search-input',
    props: ['oldQuery'],
    data() {
      return {
        inputQuery: ''
      };
    },
    created: function () {
      this.inputQuery = this.oldQuery;
    },
    watch: {
      inputQuery: function (query) {
        this.$emit('queryChanged', query);
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
