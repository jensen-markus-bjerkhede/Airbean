import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function getIndex(state, product) {
    return state.shoppingCart.findIndex(item => item.id === product.id);
}

export default new Vuex.Store({
    state: {
        apiURL: 'http://localhost:5000/',
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
        addProductsToState(state, products) {
            state.products = products
        },
        toggleNavigation(state) {
            state.ui.showNavigation = !state.ui.showNavigation;
        },
        toggleShoppingCart(state) {
            state.ui.showShoppingCart = !state.ui.showShoppingCart;
        }
    },
    actions: {
        async fetchProducts(ctx) {
            try {
                let resp = await fetch(`${ctx.state.apiURL}products`)
                let data = await resp.json()

                ctx.commit('addProductsToState', data)
            }
            catch (err) {
                console.error(err)
            }
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
            let resp = await fetch(`${this.state.apiURL}users/create`, post)
            if (resp.status === 201 || resp.status === 200) {
                let user = await resp.json()
                sessionStorage.setItem('user', JSON.stringify(user))
                return user;
            }
        }
    },
    modules: {
    },
    getters: {
        products: state => {
            return state.products
        },
        shoppingCart: state => {
            return state.shoppingCart
          },
          totalShoppingCart: state => {
            //let sum = 0;
            let cartLength = 0
            state.shoppingCart.forEach(item => {
              cartLength += item.quantity;
            });
            return cartLength;
          }
    }
})