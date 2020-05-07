import router from '../../../router';
const state = {
    products: [],
    newProduct: {}
};

const mutations = {
    setNewProduct: (state, newProduct) => state.newProduct = newProduct,
    pushProduct: (state, newProduct) => state.products.push(newProduct)
};

const getters = {
    getProducts: (state) => state.products,
    getNewProduct: (state) => state.newProduct
};

const actions = {
    setNewProduct: ({ state, commit }, prop) => commit('setNewProduct', { ...state.newProduct, ...prop }),
    async uploadProduct({ commit, state, dispatch }) {
        const product = await dispatch('POST', {
            uri: 'products',
            data: state.newProduct
        })
        commit('pushProduct', product)
        router.push('/')
    },
    async downloadProducts({ commit, dispatch }) {
        const products = await dispatch('GET', {
            uri: 'products'
        })
        products.forEach(element => {
            commit('pushProduct', element)
        });
    }
};

import validate from './validate'; ''
export default {
    state,
    mutations,
    getters: { ...getters, ...validate.getters },
    actions,
}