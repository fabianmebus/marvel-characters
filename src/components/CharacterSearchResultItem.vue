<template>
  <router-link class="link" v-bind:to="`/character/${character.id}`">
    <img v-bind:src="character.thumbnail.path + '/standard_small.' + character.thumbnail.extension" v-bind:alt="character.name">
    {{character.name}}
  </router-link>
</template>

<script>
  export default {
    name: 'character-search-result-item',
    props: ['character']
  };
</script>

<style scoped>
  .link {
    display: flex;
    flex-wrap: nowrap;
    padding: 8px 0;
    color: #000;
    text-decoration: none;
  }

  .link:hover {
    text-decoration: underline;
  }

  img {
    width: 65px;
    height: 45px;
    margin-right: 10px;
    flex-shrink: 0;
  }
</style>
