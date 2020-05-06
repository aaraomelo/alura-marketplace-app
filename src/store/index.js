import Vuex from "vuex";
import Vue from "vue";
import requests from "./modules/requests";
import users from "./modules/users";
import products from "./modules/products";

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        products,
        requests,
        users,
    }
})