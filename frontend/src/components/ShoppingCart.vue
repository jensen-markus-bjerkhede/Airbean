<template>
  <section class="ShoppingCart-box">
    <section id="ShoppingCart">
      <h2>Din beställning</h2>
      <ShoppingCartItem
        :shoppingCartItem="shoppingCartItem"
        :key="shoppingCartItem.id"
        v-for="shoppingCartItem in shoppingCart"
      />
      <h2 class="total">
        Total <span class="total-dots"></span>{{ totalCost }} kr
      </h2>
      <p>inkl moms + drönarleverans</p>
      <button @click="placeOrder" class="order-button">Take my money!</button>
    </section>
  </section>
</template>

<script>
import ShoppingCartItem from "@/components/ShoppingCartItem";

function getOrderProductsFromShoppingCart(shoppingCartItems) {
  let orderProducts = [];
  shoppingCartItems.forEach(function(item) {
    orderProducts.push({id: item.id, quantity: item.quantity});
  });
  return orderProducts;
}

export default {
  name: "ShoppingCart",
  components: {
    ShoppingCartItem,
  },
  computed: {
    shoppingCart() {
      return this.$store.getters.shoppingCart;
    },
    totalCost() {
      return this.$store.getters.shoppingCart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
  },
  methods: {
    placeOrder() {
      let user = JSON.parse(sessionStorage.getItem('user'));
      let ownerMail;
      if (user === null) {
        ownerMail = 'unknown';
      } else {
        ownerMail = user.mail;
      }
      let orderProducts = getOrderProductsFromShoppingCart(this.$store.getters.shoppingCart);
      let order = {
        owner: ownerMail,
        products: orderProducts
      };
      this.$store.dispatch('placeOrder', order);
      this.$router.push('/status');
    },
  },
};
</script>

<style lang="scss">
@import "./../scss/variables";

.ShoppingCart-box {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  padding: 6rem 1rem;
}
#ShoppingCart {
  background: #ffffff;
  padding: 3rem 1rem;
  p {
    text-align: left;
  }
}
.cart-item {
  text-align: left;
  display: flex;
  .item-quantity {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin-left: 0.5rem;
    .inc-quantity,
    .dec-quantity {
      cursor: pointer;
      height: 5px;
    }
    .dec-quantity {
      transform: rotate(180deg);
    }
  }
  .item-info {
    display: flex;
    flex-direction: column;
  }
}
.total {
  display: flex;
  text-align: left;
}
.order-button {
  width: 248px;
  height: 55px;
  background: $airBeanBrown;
  border-radius: 50px;
  color: #ffffff;
  font-size: 24px;
  margin-top: 2.5rem;
}
</style>