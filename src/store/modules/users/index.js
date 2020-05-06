import router from '../../../router';

const getDefaultState = () => {
    return {
        auth: null,
        loginUser: {},
        newUser: {},
        user: {},
        token: localStorage.getItem('token')
    }
}

const state = getDefaultState();

const mutations = {
    enableAuth: (state) => state.auth = true,
    disableAuth: (state) => state.auth = false,
    setLoginUser: (state, loginUser) => state.loginUser = loginUser,
    setNewUser: (state, newUser) => state.newUser = newUser,
    setUser: (state, { user }) => state.user = user,
    setToken(state, { token }) {
        state.token = token;
        localStorage.setItem('token', token)
    },
    resetState: (state) => Object.assign(state, getDefaultState())
};

var getters = {
    getLoginUser: (state) => state.loginUser,
    getNewUser: (state) => state.newUser,
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    getAuth: (state) => state.auth,
};

const actions = {
    setNewUser({ state, commit }, prop) {
        commit('setNewUser', { ...state.newUser, ...prop })
    },
    setLoginUser({ state, commit }, prop) {
        commit('setLoginUser', { ...state.loginUser, ...prop })
    },
    async registerNewUser({ state, commit, dispatch, getters }) {
        getters.usersErrors.newUser.touch();
        const user = await dispatch('POST', {
            uri: 'users',
            data: state.newUser
        })
        commit('setUser', { user: user.user });
        commit('setToken', { token: user.token });
        commit('enableAuth');
        router.push('/')
    },
    async loginUser({ state, commit, dispatch, getters }) {
        getters.usersErrors.loginUser.touch();
        const user = await dispatch('POST', {
            uri: 'users/login',
            data: state.loginUser
        })
        commit('setUser', { user: user.user });
        commit('setToken', { token: user.token });
        commit('enableAuth');
        router.push('/')
    },
    logoutUser({ commit }) {
        localStorage.removeItem('token')
        commit('resetState')
    },

    async verifyToken({ state, dispatch, commit }) {
        const user = await dispatch('GET', { uri: 'users', httpConfigs: { headers: { 'Authorization': state.token } } })
        commit('setUser', { user });
        commit('enableAuth');
    }
};


import validate from './validate';
export default {
    state,
    mutations,
    getters: { ...getters, ...validate.getters },
    actions,
}