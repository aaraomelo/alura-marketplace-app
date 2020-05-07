const getDefaultState = () => {
    return {
        errors: {
            loginUser: {
                email: false,
                password: false
            },
            newUser: {
                email: false,
            },
            newProduct: {
                image: false
            },
        }
    }
}

const state = getDefaultState();

const mutations = {
    setErrors(state, { errors }) {
        state.errors = errors;
    }
}

const actions = {
    error({ commit }, { error }) {
        const errors = getDefaultState();
        const message = Object.assign({}, error).response.data.message
        errors.errors.loginUser.email = message == "Este email não está cadastrado";
        errors.errors.loginUser.password = message == "Senha inválida";
        errors.errors.newUser.email = message == "Email já cadastrado";
        errors.errors.newProduct.image = message == "Imagem inválida";
        if (message == "É necessário informar um token" || message == "Token inválido")
            commit('disableAuth');
        commit('setErrors', errors);
    },
    clearErrors({commit}){
        commit('setErrors', getDefaultState());
    }
}

export default {
    state,
    mutations,
    actions,
}