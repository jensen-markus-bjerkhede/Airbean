<template>
  <section class="product-wrapper" >
    <section class="product-item">
      <button class="purchase-btn" @click = "addProductToShoppingCart"> +
      </button>

      <h2 class="item-name">{{product.title}}</h2>
      <span class="dots"></span>
      <p class="price">{{product.price}} kr</p>
    </section>
    <section class="desc-wrapper">
      <p class="desc">{{product.desc}}</p>
    </section>
  </section>
</template>

<script>
  export default {
    name: 'product',
    props: {
      product: Object
    },
    methods: {
    addProductToShoppingCart() {
    this.$store.commit('addToShoppingCart', this.product)
    }
    }
  }
</script>

<style lang="scss">

  .product-wrapper {
    grid-column: 2 / span 1;
  }
  .product-item {
    display: flex;

    .purchase-btn {
      width: 32px;
      height: 32px;

      border-radius: 999rem;
      background: #2F2926;
      box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.12);
    }

    h2 {
      text-align: left;
      padding-left: 1rem;
    }

    .price {
      line-height: 33px;
      margin-left: auto;
    }
  }
  .desc {
    width: 100%;
    text-align: left;
    margin-left: 50px;
  }
  .dot{
    border-bottom: 2px dotted black;
    height: 22px;
  }
</style>