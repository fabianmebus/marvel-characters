<template>
  <div>
    <img v-bind:src="character.thumbnail.path + '/standard_small.' + character.thumbnail.extension" v-bind:alt="character.name">
    <router-link class="link" v-bind:to="`/character/${character.id}`">{{character.name}}</router-link>
  </div>
</template>

<script>
  export default {
    name: 'character-search-result-item',
    props: ['character']
  };
</script>

<style scoped>
  div {
    display: flex;
    flex-wrap: nowrap;
    padding: 8px 0;
  }

  img {
    width: 65px;
    height: 45px;
    margin-right: 10px;
    flex-shrink: 0;
  }

  .link {
    color: #000;
  }
</style>
