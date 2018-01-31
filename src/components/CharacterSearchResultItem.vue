<template>

  <router-link class="link" v-bind:to="`/character/${character.id}`">
    <img class="link__img" v-bind:src="character.thumbnail.path + '/standard_fantastic.' + character.thumbnail.extension" v-bind:alt="character.name">
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
    color: #000;
    text-decoration: none;
    display: inline-block;
  }

  .link:hover {
    text-decoration: underline;
  }

  .link__img {
    background-color: #eee;
    width: calc((100vw - 60px) / 2);
    height: calc((100vw - 60px) / 2);
    vertical-align: middle;
    margin-bottom: 5px;
  }

  @media (min-width: 400px) {

    .link__img {
      width: calc((100vw - 80px) / 3);
      height: calc((100vw - 80px) / 3);
    }
  }

  @media (min-width: 590px) {

    .link__img {
      width: calc((100vw - 100px) / 4);
      height: calc((100vw - 100px) / 4);
    }
  }

  @media (min-width: 700px) {

    .link__img {
      width: calc((700px - 100px) / 4);
      height: calc((700px - 100px) / 4);
    }
  }
</style>
