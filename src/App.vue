<template>
  <div class="page">

    <header>
      <h1>
        <svg xmlns="http://www.w3.org/2000/svg" height="43" viewBox="-215.549 -86.179 1000 402.077">
          <path fill="#EC2227" d="M-215.549-86.179h1000v402.077h-1000z"/>
          <path fill="#FFF"
                d="M514.01-54.726h112.036l.088 70.82h-51.377v65.921l51.401-.013v69.413l-51.324.01-.039 64.952h51.251v68.944l-111.933.065-.103-340.112M646.186 285.455h109.298v-68.891h-51.63v-271.29l-57.644.135-.024 340.046"/>
          <path fill="#FFF"
                d="M257.373 9.06v101.027c13.482-1.661 37.094-11.899 37.094-52.566 0-40.666-23.229-48.461-37.094-48.461m257.145-63.786l-52.691 340.079h-68.684L354.965 53.377c1.068 70.16-36.742 100.475-36.742 100.475l42.75 131.469h-59.718L264.761 175l-7.361.181v110.144h-60.101V-54.548s79.16-.392 89.914-.176c24.497.495 47.96 34.936 60.989 66.453l-8.739-66.453h60.353l27.104 187.46 27.677-187.46h59.922v-.002zM-62.89 285.403l27.923-138.199v138.117h61.213V-54.726h-77.385L-79.052 98.119l-27.912-152.845h-77.381v340.047h61.23V147.204l27.909 138.199h32.316"/>
          <path fill="#FFF"
                d="M111.361 75.686L95.697 188.575h31.832L111.361 75.686M87.368 252.371l-6.369 32.95H23.71L72.175-54.726h77.381l48.487 340.043H140.74l-6.357-32.949H87.368v.003z"/>
        </svg>
        Characters
      </h1>
    </header>

    <main>
      <!--

      CharacterSearch
      -> characters
      -> query

      Character
      -> characters

      -->
      <router-view
        v-bind="{'characters': characters, 'query': query}"
        v-on:queryChanged="handelQueryChange">
      </router-view>

    </main>

    <footer>
      Created with &#9829; and <a href="https://vuejs.org/">Vue.js</a> by <a href="https://fabianmebus.com">Fabian Mebus</a><br>
      <a href="https://github.com/fabianmebus/marvel-characters">Find the source code on GitHub.</a>
    </footer>

  </div>
</template>

<script>


  export default {
    name: 'app',
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
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 30px;
  }

  svg {
    margin-right: 5px;
    flex-shrink: 0;
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
