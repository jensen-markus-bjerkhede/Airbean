<template>
  <main id="products">
    <h1>Meny</h1>
    <Product v-for="product in products" :key="product.id" :product="product"/>
  </main>
</template>

<script>

  import Product from '@/components/Product'
  export default {
    name: 'menu-page',
    components: {
      Product,
    },
    computed: {
      products(){
          console.log('sdfdsfsd')
        return this.$store.getters.products;
      },
    }
  }
</script>