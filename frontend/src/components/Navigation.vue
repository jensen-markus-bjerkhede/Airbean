<template>
  <section id="navigation">
      <nav @click="hideNavigation">
     <router-link class="link" to="/menu">Meny</router-link>
      </nav>
  </section>
</template>

<script>
export default {
    name: 'navigation',
    methods: {
        hideNavigation() {
            this.$store.commit('toggleNavigation')
        }
    }
}
</script>

<style lang="scss">

#navigation {
    position: fixed; 
    width: 100%; 
    height: 100%; 
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5); 
    z-index: 2; 

    nav {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .link {
            color: #FFFFFF;
            font-size: 32px;
            line-height: 120%;
            text-decoration: none;
        }
    }
}
</style>