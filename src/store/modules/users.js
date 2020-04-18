
const getDefaultState = () => {
    return {
        loginUser: {},
        newUser: {},
        user: {},
        token: ''
    }

}

const state = getDefaultState();

const mutations = {
    setLoginUser: (state,  loginUser ) => state.loginUser = loginUser,
    setNewUser: (state,  newUser ) => state.newUser = newUser,
    setUser: (state, { user }) => state.user = user,
    setToken(state, { token }) {
        state.token = token;
        localStorage.setItem('token', token)
    },
    resetState: (state) => Object.assign(state, getDefaultState())
};

const getters = {
    getLoginUser: (state) => state.loginUser,
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
    },
    async loginUser({ state, commit, dispatch }) {
        const res = await dispatch('POST', {
            uri: 'users/login',
            data: state.loginUser
        })
        commit('setUser', { user: res.user });
        commit('setToken', { token: res.token });
    },
    logoutUser({ commit }) {
        commit('resetState')
        localStorage.removeItem('token')
    }
};

export default {
    state,
    mutations,
    getters,
    actions
}