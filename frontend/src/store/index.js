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
            let resp = await fetch(`${this.state.apiURL}user/create`, post)
            if (resp.status === 201 || resp.status === 200) {
                let user = await resp.json()
                sessionStorage.setItem('user', JSON.stringify(user))
            }
        }
    },
    async getUser() {
        try {
            this.state.user = JSON.parse(sessionStorage.getItem('user'))
        }
        catch (err) {
            console.error(err)
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