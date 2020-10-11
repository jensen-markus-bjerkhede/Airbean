import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Landing',
        component: () => import('../views/Landing.vue')
    },
    {
        path: '/Menu',
        name: 'Menu',
        component: () => import('../views/Menu.vue')
    },
]

const router = new VueRouter({
    routes
})

export default router