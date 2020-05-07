import Vue from 'vue';
import { validationMixin } from 'vuelidate'
import { alpha, required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import store from "../../../store";

const validator = new Vue({
    mixins: [validationMixin],
    computed: { state: () => store.state.users },
    validations: {
        state: {
            newUser: {
                name: { alpha, required, maxLength: maxLength(30), minLength: minLength(3) },
                email: {
                    required,
                    email,
                    found() {
                        if (!store.state.requests.errors.newUser.email) {
                            return true;
                        }
                        store.dispatch('clearErrors')
                        return false
                    }
                },
                password: { required, minLength: minLength(6) },
            },
            loginUser: {
                email: {
                    required,
                    email,
                    found() {
                        if (!store.state.requests.errors.loginUser.email) {
                            return true
                        }
                        store.dispatch('clearErrors')
                        return false;
                    }
                },
                password: {
                    required,
                    minLength: minLength(6),
                    found() {
                        if (!store.state.requests.errors.loginUser.password) {
                            return true;
                        }
                        store.dispatch('clearErrors')
                        return false;
                    }
                }
            },
        }
    }
})

const getters = {
    usersErrors() {
        return {
            newUser: {
                name() {
                    const errors = [];
                    const v = validator.$v.state.newUser.name;
                    if (!v.$dirty) return errors;
                    !v.maxLength && errors.push("O nome deve ter no máximo 32 letras");
                    !v.minLength && errors.push("O nome deve ter no mínimo 3 letras");
                    !v.alpha && errors.push("Utilize somente letras no nome");
                    !v.required && errors.push("É necessário o nome");
                    return errors;
                },
                email() {
                    const errors = [];
                    const v = validator.$v.state.newUser.email;
                    if (!v.$dirty) return errors;
                    !v.email && errors.push("Entre com um email válido");
                    !v.required && errors.push("É necessário o email");
                    !v.found && errors.push("Este email já está cadastrado");
                    return errors;
                },
                password() {
                    const errors = [];
                    const v = validator.$v.state.newUser.password;
                    if (!v.$dirty) return errors;
                    !v.minLength && errors.push("A senha deve ter no mínimo 6 caracteres");
                    !v.required && errors.push("É necessário a senha");
                    return errors;
                },
                touch: () => validator.$v.state.newUser.$touch(),
                touchName: () => validator.$v.state.newUser.name.$touch(),
                touchPassword: () => validator.$v.state.newUser.password.$touch(),
                touchEmail: () => validator.$v.state.newUser.email.$touch(),
            },
            loginUser: {
                email() {
                    const errors = [];
                    const v = validator.$v.state.loginUser.email;
                    if (!v.$dirty) return errors;
                    !v.email && errors.push("Entre com um email válido");
                    !v.required && errors.push("É necessário o email");
                    !v.found && errors.push("Este email não está cadastrado");
                    return errors;
                },
                password() {
                    const errors = [];
                    const v = validator.$v.state.loginUser.password;
                    if (!v.$dirty) return errors;
                    !v.minLength && errors.push("A senha deve ter no mínimo 6 caracteres");
                    !v.required && errors.push("É necessário a senha");
                    !v.found && errors.push("Senha inválida");
                    return errors;
                },
                touch: () => validator.$v.state.loginUser.$touch(),
                touchEmail: () => validator.$v.state.loginUser.email.$touch(),
                touchPassword: () => validator.$v.state.loginUser.password.$touch()
            }
        }
    }
};

export default {
    getters
}
