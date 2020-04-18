
const state = {
    newUser: {
        name: '',
        email: '',
        password: ''
    },
    user: {},
    token: ''
};

const mutations = {
    setNewUser: (state, { newUser }) => state.newUser = newUser,
    setUser: (state, { user }) => state.user = user,
    setToken(state, { token }) {
        state.token = token;
        localStorage.setItem('token', token)
    }
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