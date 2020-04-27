
const getDefaultState = () => {
    return {
        auth: false,
        loginUser: {
            email:'van@van.com',
            password:'123456'
        },
        newUser: {},
        user: {},
        token: localStorage.getItem('token')
    }
}

const state = getDefaultState();

const mutations = {
    enableAuth: (state) => state.auth = true,
    setLoginUser: (state, loginUser) => state.loginUser = loginUser,
    setNewUser: (state, newUser) => state.newUser = newUser,
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
    getToken: (state) => state.token,
    getAuth: (state) => state.auth
};

const actions = {
    async registerNewUser({ state, commit, dispatch }) {
        const user = await dispatch('POST', {
            uri: 'users',
            data: state.newUser
        })
        if (user) {
            commit('setUser', { user: user.user });
            commit('setToken', { token: user.token });
            commit('enableAuth');
        }
    },
    async loginUser({ state, commit, dispatch }) {
        const user = await dispatch('POST', {
            uri: 'users/login',
            data: state.loginUser
        })
        if (user) {
            commit('setUser', { user: user.user });
            commit('setToken', { token: user.token });
            commit('enableAuth');
        }
    },
    logoutUser({ commit }) {
        localStorage.removeItem('token')
        commit('resetState')
    },

    async verifyToken({ state, dispatch, commit }) {
        const user = await dispatch('GET', { uri: 'users', httpConfigs: { headers: { 'Authorization': state.token } } })
        if (user) {
            commit('setUser', { user });
            commit('enableAuth');
        }
    }
};

export default {
    state,
    mutations,
    getters,
    actions
}