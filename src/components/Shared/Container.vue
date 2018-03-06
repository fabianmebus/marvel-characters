<template>
  <div class="container">
    <slot></slot>
  </div>
</template>


<script>
  export default {
    name: 'container',
  };
</script>

<style scoped>

  .container {
    padding: 0 15px;
    margin: 0 auto;
    max-width: 700px;
    /*min-height: 100vh;*/
  }

</style>
