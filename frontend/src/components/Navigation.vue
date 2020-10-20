<template>
  <section id="navigation">
    <nav @click="hideNavigation">
      <router-link class="link" to="/menu">Meny</router-link>
      <router-link class="link" to="/about">Vårt kaffe</router-link>
      <router-link class="link" to="/profile">Min profil</router-link>
      <router-link class="link" to="/status">Orderstatus</router-link>
    </nav>
  </section>
</template>

<script>
export default {
  name: "navigation",
  methods: {
    hideNavigation() {
      this.$store.commit("toggleNavigation");
    },
  },
};
</script>

<style lang="scss">
#navigation {
  position: fixed;
  width: 23.5rem;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  z-index: 2;

  nav {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .link {
      color: #ffffff;
      font-size: 32px;
      line-height: 120%;
      text-decoration: none;
    }
  }
}
</style>