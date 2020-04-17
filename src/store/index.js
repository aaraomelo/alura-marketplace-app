import Vuex from "vuex";
import Vue from "vue";
import requests from "./modules/requests";
import users from "./modules/users";

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        requests,
        users
    }
})