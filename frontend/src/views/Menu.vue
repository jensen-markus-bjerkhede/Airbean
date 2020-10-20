<template>
  <main id="products">
      <ShoppingCartButton :cartQuantity="totalShoppingCart"/>
    <ShoppingCart v-if="shoppingCartToggle"/>
    <img class="leafTop" src="@/assets/leafHorizontal/headerTop.svg" alt="" />
      <img class="leafBottom" src="@/assets/leafHorizontal/headerBottom.svg" alt="" />
    <h1>Meny</h1>
    <Product v-for="product in products" :key="product.id" :product="product"/>
  </main>
</template>

<script>

  import Product from '@/components/Product'
  import ShoppingCart from '@/components/ShoppingCart'
  import ShoppingCartButton from '@/components/ShoppingCartButton'
  export default {
    name: 'menu-page',
    components: {
      Product,
      ShoppingCart,
      ShoppingCartButton
    },
    computed: {
      products(){
        return this.$store.getters.products;
      },
      shoppingCartToggle() {
      return this.$store.state.ui.showShoppingCart
    },
    totalShoppingCart() {
      let sum = 0;
      this.$store.getters.shoppingCart.forEach(item => {
        sum += item.quantity;
      });
      return sum;
    },
    }
  }
</script>