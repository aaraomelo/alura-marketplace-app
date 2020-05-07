import Vue from 'vue';
import { validationMixin } from 'vuelidate'
import { required, minLength, decimal } from 'vuelidate/lib/validators'
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
                        if (!store.state.requests.errors.newProduct.image){
                            return true;
                        }
                        store.state.requests.errors.newProduct.image = false
                        return false ;
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
                    const v = validator.$v.state.newProduct.description;
                    if (!v.$dirty) return errors;
                    !v.minLength && errors.push("A descrição deve ter no mínimo 10 letras");
                    !v.required && errors.push("É necessário a descrição do produto");
                    return errors;
                },
                price() {
                    const errors = [];
                    const v = validator.$v.state.newProduct.price;
                    if (!v.$dirty) return errors;
                    !v.required && errors.push("É necessário o preço do produto");
                    !v.decimal && errors.push("O preço deve ser um número decimal");
                    return errors;
                },
                image() {
                    const errors = [];
                    const v = validator.$v.state.newProduct.image;
                    if (!v.$dirty) return errors;
                    !v.required && errors.push("É necessário uma imagem do produto");
                    !v.found && errors.push("Imagem inválida");
                    return errors;
                },
                touch: () => validator.$v.state.newProduct.$touch(),
                touchDescription: () => validator.$v.state.newProduct.description.$touch(),
                touchPrice: () => validator.$v.state.newProduct.price.$touch(),
                touchImage: () => validator.$v.state.newProduct.image.$touch()
            },
        }
    }
};

export default {
    getters
}
