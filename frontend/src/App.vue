<template>
  <div id="app">

    <Navigation v-show="navigationToggle"/>
    <NavigationButton/>
    <router-view/>
  </div>
</template>

<script>

import Navigation from '@/components/Navigation'
import NavigationButton from '@/components/NavigationButton'

  export default {
    name: 'App',
    components: {
      Navigation,
      NavigationButton
    },
   computed: {
      navigationToggle() {
        return this.$store.state.ui.showNavigation
      },
    },
    beforeMount(){
      this.$store.dispatch('fetchProducts')
    }
  }
</script>

<style lang="scss">

  @import './scss/main';

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>