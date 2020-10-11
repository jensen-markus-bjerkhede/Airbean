import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        apiURL: 'http://localhost:5000/',
        ui: {
            showNavigation: false,
        },
        products: Array
    },
    mutations: {
        addProductsToState(state, products) {
            state.products = products
        },
        toggleNavigation(state) {
            state.ui.showNavigation = !state.ui.showNavigation;
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
        }
    },
    modules: {
    },
    getters: {
        products: state => {
            return state.products
        },
    }
})