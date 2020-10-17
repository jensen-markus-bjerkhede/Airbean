<template>
    <article class="ShoppingCart-item">
        <section class="item-info">
            <h2 class="item-name">{{shoppingCartItem.title}}</h2>
            <span>{{shoppingCartItem.price}} kr</span>
        </section>
        <p class="dots"></p>
        <section class="item-quantity">
            <img class="inc-quantity" @click="increaseItem" src="./../assets/arrow.svg" alt="">
            <span >{{quantity}}</span>
            <img class="dec-quantity" @click="decreaseItem" src="./../assets/arrow.svg" alt="">
        </section>
    </article>
</template>

<script>
    export default {
        name: 'ShoppingCart-item',
        props: {
            shoppingCartItem: Object
        },
        data(){
            return {
                quantity: this.shoppingCartItem.quantity
            }
        },
        methods: {
            increaseItem() {
                this.quantity++;
                this.$store.commit('increaseItem', this.shoppingCartItem);
            },
            decreaseItem() {
                this.quantity--
                this.$store.commit('decreaseItem', this.shoppingCartItem);
            }
        }
    }
</script>

<style lang="scss">
    .ShoppingCart-item {
        text-align: left;
        display: flex;

        .item-quantity {
            margin-left: auto;
            align-self: center;
        }
    }
</style>