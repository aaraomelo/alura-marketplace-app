import Vuex from "vuex";
import Vue from "vue";
import requests from "./modules/requests";
import users from "./modules/users";
import validate from "./modules/validate";

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        validate,
        requests,
        users
  
    }
})