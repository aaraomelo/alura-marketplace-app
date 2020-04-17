
const state = {
    newUser: {
        name: 'test',
        email: 'teste@teste.com',
        password: '123456'
    },
    user: {},
    token: ''    
};

const mutations = {
    setNewUser: (state, { newUser }) => state.newUser = newUser,
    setUser: (state, { user }) => state.user = user,
    setToken: (state, { token }) => state.token = token
};

const getters = {
    getNewUser: (state) => state.newUser,
    getUser: (state) => state.user,
    getToken: (state) => state.token
};

const actions = {
    async registerNewUser({ state, commit, dispatch }) {
        const res = await dispatch('POST', {
            uri: 'users',
            data: state.newUser
        })
        commit('setUser', { user: res.user });
        commit('setToken', { token: res.token });
    }
};

export default {
    state,
    mutations,
    getters,
    actions
}