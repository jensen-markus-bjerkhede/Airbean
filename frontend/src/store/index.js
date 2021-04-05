import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function getIndex(state, product) {
    return state.shoppingCart.findIndex(item => item.id === product.id);
}

function getBaseURL() {
    return 'http://localhost:5000/';
}

export default new Vuex.Store({
    state: {
        ui: {
            showNavigation: false,
            showShoppingCart: false,
        },
        products: Array,
        shoppingCart: []
    },
    mutations:
    {
        addToShoppingCart(state, product) {
            const index = getIndex(state, product)
            if (index === -1) {
                product.quantity = 1
                state.shoppingCart.push(product)
            } else {
                product.quantity++;
                Vue.set(state.shoppingCart, index, product);
            }
        },
        increaseItem(state, product) {
            const index = getIndex(state, product);
            product.quantity++;
            Vue.set(state.shoppingCart, index, product);
        },
        decreaseItem(state, product) {
            const index = getIndex(state, product)
            let item = state.shoppingCart[index]
            if (item.quantity > 1) {
                product.quantity--;
                Vue.set(state.shoppingCart, index, product);
            } else {
                state.shoppingCart.splice(index, 1)
            }
        },
        toggleNavigation(state) {
            state.ui.showNavigation = !state.ui.showNavigation;
        },
        toggleShoppingCart(state) {
            state.ui.showShoppingCart = !state.ui.showShoppingCart;
        },
        clearShoppingCart(state) {
            state.shoppingCart = [];
        },
        updateProducts(state, products) {
            state.products = products;
        },
    },
    actions: {
        async placeOrder(ctx, order) {
            let post = {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }
            let resp = await fetch(`${getBaseURL()}orders/create`, post)
            if (resp.status === 201) {
                ctx.commit("toggleShoppingCart");
                ctx.commit("clearShoppingCart");
                return resp.body;
            }
        },
        async fetchProducts(ctx) {
            let resp = await fetch(`${getBaseURL()}products`);
            ctx.commit("updateProducts", await resp.json());
        },
        async createUser(ctx, user) {
            let post = {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }
            let resp = await fetch(`${getBaseURL()}users/create`, post)
            if (resp.status === 201 || resp.status === 200) {
                let user = await resp.json();
                sessionStorage.setItem('user', JSON.stringify(user));
                ctx.commit("clearShoppingCart");
                return user;
            }
        },
        async fetchOrderHistory() {
            const user = await JSON.parse(sessionStorage.getItem('user'));
            let resp = await fetch(`${getBaseURL()}orders?owner=${user.mail}`)
            return resp.json();
        },
        async fetchLatestOrder() {
            const user = await JSON.parse(sessionStorage.getItem('user'));
            let ownerMail;
            if (user === null) {
                ownerMail = 'unknown';
            } else {
                ownerMail = user.mail;
            }
            let resp = await fetch(`${getBaseURL()}orders/latest?owner=${ownerMail}`)
            return resp.json();
        },
    },
    getters: {
        products: state => {
            return state.products
        },
        shoppingCart: state => {
            return state.shoppingCart
        },
        totalShoppingCart: state => {
            let cartLength = 0
            state.shoppingCart.forEach(item => {
                cartLength += item.quantity;
            });
            return cartLength;
        },
    }
})