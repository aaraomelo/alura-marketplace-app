
import axios from 'axios'

const url = 'http://localhost:3000/'

const actions = {

    POST({ dispatch }, { uri, data = {} }) {
        return new Promise((resolve) => {
            axios.post(`${url}${uri}`, data)
                .then(response => { resolve(response.data) })
                .catch(error => dispatch('error', { error }));
        });
    },

    GET({ dispatch }, { uri, httpConfigs = {} }) {
        return new Promise((resolve) => {
            axios.get(`${url}${uri}`, httpConfigs)
                .then(response => resolve(response.data))
                .catch(error => dispatch('error', { error }));
        });
    }
};

import error from './error';
export default {
    state: error.state,
    mutations: error.mutations,
    actions: {...actions,...error.actions },
}