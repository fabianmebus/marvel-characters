<template>
  <div class="page">

    <header class="page__header">

      <div class="logo">
        <app-container>
          <div class="logo__inner">
            <svg xmlns="http://www.w3.org/2000/svg" class="logo__image" height="45" viewBox="-215.549 -86.179 1000 402.077">
              <path fill="#EC2227" d="M-215.549-86.179h1000v402.077h-1000z"/>
              <path fill="#FFF"
                    d="M514.01-54.726h112.036l.088 70.82h-51.377v65.921l51.401-.013v69.413l-51.324.01-.039 64.952h51.251v68.944l-111.933.065-.103-340.112M646.186 285.455h109.298v-68.891h-51.63v-271.29l-57.644.135-.024 340.046"/>
              <path fill="#FFF"
                    d="M257.373 9.06v101.027c13.482-1.661 37.094-11.899 37.094-52.566 0-40.666-23.229-48.461-37.094-48.461m257.145-63.786l-52.691 340.079h-68.684L354.965 53.377c1.068 70.16-36.742 100.475-36.742 100.475l42.75 131.469h-59.718L264.761 175l-7.361.181v110.144h-60.101V-54.548s79.16-.392 89.914-.176c24.497.495 47.96 34.936 60.989 66.453l-8.739-66.453h60.353l27.104 187.46 27.677-187.46h59.922v-.002zM-62.89 285.403l27.923-138.199v138.117h61.213V-54.726h-77.385L-79.052 98.119l-27.912-152.845h-77.381v340.047h61.23V147.204l27.909 138.199h32.316"/>
              <path fill="#FFF"
                    d="M111.361 75.686L95.697 188.575h31.832L111.361 75.686M87.368 252.371l-6.369 32.95H23.71L72.175-54.726h77.381l48.487 340.043H140.74l-6.357-32.949H87.368v.003z"/>
            </svg>
            Characters
          </div>
        </app-container>
      </div>

      <nav class="nav" v-if="authenticated !== null">
        <app-container>
          <ul class="nav__list">
            <li class="nav__list-item">
              <router-link to="/" class="nav__action">
                Home
              </router-link>
            </li>

            <li v-if="authenticated === true" class="nav__list-item">
              <router-link to="/favorites" class="nav__action">
                Favorites
              </router-link>
            </li>

            <li v-if="authenticated === false" class="nav__list-item nav__list-item--to-right">
              <router-link to="/sign-in" class="nav__action">
                Sign in
              </router-link>
            </li>
            <li v-if="authenticated === true" class="nav__list-item nav__list-item--to-right">
              <router-link to="/profile" class="nav__action">
                <img height="32" width="32" class="nav__avatar" :src="user.photoURL" :alt="user.displayName">
              </router-link>
            </li>
          </ul>
        </app-container>
      </nav>

    </header>

    <main class="page__main">
      <app-container>
        <router-view v-if="authenticated !== null"></router-view>
      </app-container>
    </main>

    <footer class="page__footer">
      <app-container>
        Created with &#9829; and <a href="https://vuejs.org/" class="page__footer-action">Vue.js</a>
        by <a href="https://fabianmebus.com" class="page__footer-action">Fabian Mebus</a><br>
        <a href="https://github.com/fabianmebus/marvel-characters" class="page__footer-action">Find the source code on GitHub.</a>
      </app-container>
    </footer>

  </div>
</template>


<script>
  export default {
    name: 'app',
    computed: {
      authenticated() {
        return this.$store.getters.authenticated;
      },
      user() {
        return this.$store.getters.user;
      },
    },
  };
</script>

<style scoped lang="scss">

  .page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    &__header {
      margin-bottom: 20px;
    }

    &__main {
      flex: 1;
    }

    &__footer {
      margin-top: 30px;
      padding: 20px 0;
      text-align: center;
      color: #989898;
      font-size: smaller;
      background-color: #303030;

      &-action {
        color: inherit;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
          color: #fff;
        }
      }
    }
  }

  .logo {
    padding: 20px 0;
    background-color: #303030;
    color: #fff;

    &__inner {
      display: flex;
      align-items: center;
      font-size: 32px;
      font-weight: 700;
    }

    &__image {
      margin-right: 5px;
      flex-shrink: 0;
      vertical-align: middle;
    }
  }

  .nav {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.4);

    &__list {
      min-height: 48px;
      margin: 0 -8px;
      padding: 0;
      list-style: none;
      display: flex;
      align-items: center;
    }

    &__list-item {

      &--to-right {
        flex-grow: 1;
        text-align: right;
      }
    }

    &__action {
      font-size: 18px;
      display: inline-block;
      padding: 8px 8px;
      color: #000;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    &__avatar {
      vertical-align: middle;

      border-radius: 5px;
      width: auto;
      height: 32px;
      /*margin-left: 40px;*/
      border: 1px solid #000;
    }
  }

</style>
