<template>
  <aside id="navigation-button"  @click="toggleNavigation">
    <div class="navigation-bar"></div>
    <div class="navigation-bar"></div>
    <div class="navigation-bar"></div>
  </aside>
</template>

<script>
  export default {
    name: 'navigation-button',
    methods: {
      toggleNavigation() {
        this.$store.commit('toggleNavigation')
      }
    }
  }
</script>