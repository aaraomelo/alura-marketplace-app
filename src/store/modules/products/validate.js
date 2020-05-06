import Vue from 'vue';
import { validationMixin } from 'vuelidate'
import { required, minLength, decimal} from 'vuelidate/lib/validators'
import store from "../../../store";

const validator = new Vue({
    mixins: [validationMixin],
    computed: { state: () => store.state.products },
    validations: {
        state: {
            newProduct: {
                description: { required, minLength: minLength(10) },
                price: { required, decimal },
                image: { 
                    required,
                    found() {
                        if (!store.state.requests.errors.newProduct.image) return true;
                        return store.state.requests.errors.newProduct.image = false;
                    }
                 }
            },
        }
    }
})

const getters = {
    productsErrors() {
        return {
            newProduct: {
                description() {
                    const errors = [];
                    if (validator.state.newProduct.description) validator.$v.state.newProduct.description.$touch();
                    if (!validator.$v.state.newProduct.description.$dirty) return errors;
                    !validator.$v.state.newProduct.description.minLength && errors.push("A descrição deve ter no mínimo 10 letras");
                    !validator.$v.state.newProduct.description.required && errors.push("É necessário a descrição do produto");
                    return errors;
                },
                price() {
                    const errors = [];
                    if (validator.state.newProduct.price) validator.$v.state.newProduct.price.$touch();
                    if (!validator.$v.state.newProduct.price.$dirty) return errors;
                    !validator.$v.state.newProduct.price.required && errors.push("É necessário o preço do produto");
                    !validator.$v.state.newProduct.price.decimal && errors.push("O preço deve ser um número decimal");
                    return errors;
                },
                image() {
                    const errors = [];
                    if (validator.state.newProduct.image) validator.$v.state.newProduct.image.$touch();
                    if (!validator.$v.state.newProduct.image.$dirty) return errors;
                    !validator.$v.state.newProduct.image.required && errors.push("É necessário uma imagem do produto");
                    !validator.$v.state.newProduct.image.found && errors.push("Imagem inválida");
                    return errors;
                },
                touch: () => validator.$v.state.newProduct.$touch()
            },
        }
    }
};

export default {
    getters
}