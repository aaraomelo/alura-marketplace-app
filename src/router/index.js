import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import store from '../store';

function requireAuth(to, from, next) {
  store.state.users.auth ? next() : store.watch(
    state => state.users.auth,
    auth => auth ? next() : next({ name: 'Login' })
  );
}


const routes = [
  {
    path: '/',
    name: 'Comprar',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/register',
    name: 'Registrar',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/sell',
    name: 'Vender',
    component: () => import('../views/Sell.vue'),
    beforeEnter: requireAuth
  }
]

//guard clause

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((from, to, next) => {
  document.title = from.name;
  next()
})

export default router
