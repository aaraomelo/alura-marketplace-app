import Vue from 'vue';
import { validationMixin } from 'vuelidate'

import users from "./users";

const validator = new Vue({
    mixins: [validationMixin],
    computed: { state: () => users.state },
    validations: users.validations
})

const getters = {
    nameErrors() {
        if (validator.state.newUser.name)
            validator.$v.state.newUser.name.$touch();
        const errors = [];
        if (!validator.$v.state.newUser.name.$dirty) return errors;
        !validator.$v.state.newUser.name.maxLength &&
            errors.push("Name must be at most 32 characters long");
        !validator.$v.state.newUser.name.minLength &&
            errors.push("Name must be at least 3 characters");
        !validator.$v.state.newUser.name.required && errors.push("Name is required.");
        return errors;
    },
    emailErrors() {
        if (validator.state.newUser.email)
            validator.$v.state.newUser.email.$touch();
        const errors = [];
        if (!validator.$v.state.newUser.email.$dirty) return errors;
        !validator.$v.state.newUser.email.email && errors.push("Must be valid e-mail");
        !validator.$v.state.newUser.email.required && errors.push("E-mail is required");
        return errors;
    },
    passwordErrors() {
        if (validator.state.newUser.password)
            validator.$v.state.newUser.password.$touch();
        const errors = [];
        if (!validator.$v.state.newUser.password.$dirty) return errors;
        !validator.$v.state.newUser.password.minLength &&
            errors.push("Password must be at least 6 characters");
        !validator.$v.state.newUser.password.required && errors.push("Password is required.");
        return errors;
    }
};

export default {
    getters
}