import Vue from 'vue';
import { validationMixin } from 'vuelidate'
import { alpha, required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import users from "./users";
import requests from "./requests";

const validator = new Vue({
    mixins: [validationMixin],
    computed: { state: () => users.state },
    validations: {
        state: {
            newUser: {
                name: { alpha, required, maxLength: maxLength(30), minLength: minLength(3) },
                email: {
                    required,
                    email,
                    found() {
                        if (!requests.state.errors.newUser.email) return true;
                        return requests.state.errors.newUser.email = false;
                    }
                },
                password: { required, minLength: minLength(6) },
            },
            loginUser: {
                email: {
                    required,
                    email,
                    found() {
                        if (!requests.state.errors.loginUser.email) return true;
                        return requests.state.errors.loginUser.email = false;
                    }
                },
                password: {
                    required,
                    minLength: minLength(6),
                    found() {
                        if (!requests.state.errors.loginUser.password) return true;
                        return requests.state.errors.loginUser.password = false;
                    }
                }
            },
        }
    }
})

const getters = {
    Errors() {
        return {
            newUser: {
                name() {
                    const errors = [];
                    if (validator.state.newUser.name) validator.$v.state.newUser.name.$touch();
                    if (!validator.$v.state.newUser.name.$dirty) return errors;
                    !validator.$v.state.newUser.name.maxLength && errors.push("O nome deve ter no máximo 32 letras");
                    !validator.$v.state.newUser.name.minLength && errors.push("O nome deve ter no mínimo 3 letras");
                    !validator.$v.state.newUser.name.alpha && errors.push("Utilize somente letras no nome");
                    !validator.$v.state.newUser.name.required && errors.push("É necessário o nome");
                    return errors;
                },
                email() {
                    const errors = [];
                    if (validator.state.newUser.email) validator.$v.state.newUser.email.$touch();
                    if (!validator.$v.state.newUser.email.$dirty) return errors;
                    !validator.$v.state.newUser.email.email && errors.push("Entre com um email válido");
                    !validator.$v.state.newUser.email.required && errors.push("É necessário o email");
                    !validator.$v.state.newUser.email.found && errors.push("Este email já está cadastrado");
                    return errors;
                },
                password() {
                    const errors = [];
                    if (validator.state.newUser.password) validator.$v.state.newUser.password.$touch();
                    if (!validator.$v.state.newUser.password.$dirty) return errors;
                    !validator.$v.state.newUser.password.minLength && errors.push("A senha deve ter no mínimo 6 caracteres");
                    !validator.$v.state.newUser.password.required && errors.push("É necessário a senha");
                    return errors;
                },
                touch: () => validator.$v.state.newUser.$touch()
            },
            loginUser: {
                email() {
                    const errors = [];
                    if (validator.state.loginUser.email) validator.$v.state.loginUser.email.$touch();
                    if (!validator.$v.state.loginUser.email.$dirty) return errors;
                    !validator.$v.state.loginUser.email.email && errors.push("Entre com um email válido");
                    !validator.$v.state.loginUser.email.required && errors.push("É necessário o email");
                    !validator.$v.state.loginUser.email.found && errors.push("Este email não está cadastrado");
                    return errors;
                },
                password() {
                    const errors = [];
                    if (validator.state.loginUser.password) validator.$v.state.loginUser.password.$touch();
                    if (!validator.$v.state.loginUser.password.$dirty) return errors;
                    !validator.$v.state.loginUser.password.minLength && errors.push("A senha deve ter no mínimo 6 caracteres");
                    !validator.$v.state.loginUser.password.required && errors.push("É necessário a senha");
                    !validator.$v.state.loginUser.password.found && errors.push("Senha inválida");
                    return errors;
                },
                touch: () => validator.$v.state.loginUser.$touch()
            }
        }
    }
};

export default {
    getters
}