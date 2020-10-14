<template>
  <aside id="cart-button" @click="toggleShoppingCart">
    <span class="total-cart-items">{{ totalShoppingCart }}</span>
    <div class="cart-top"></div>
    <div class="cart-lower"></div>
  </aside>
</template>

<script>
export default {
  name: "navigation-button",
  props: {
    cartQuantity: Number,
  },
  methods: {
    toggleShoppingCart() {
      this.$store.commit("toggleShoppingCart");
    },
  },
  computed: {
    totalShoppingCart() {
      return this.$store.getters.totalShoppingCart;
    },
  },
};
</script>