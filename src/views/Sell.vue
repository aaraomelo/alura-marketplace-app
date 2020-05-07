<template>
  <div>
    <v-app id="inspire" dark>
      <form class="ma-2">
        <v-row>
          <v-col>
            <v-text-field
              label="Descrição"
              v-model="getNewProduct().description"
              @input="setNewProduct({description: $event}); productsErrors.newProduct.touchDescription()"
              :error-messages="productsErrors.newProduct.description()"
              required
            ></v-text-field>
            <v-text-field
              label="Preço"
              v-model="getNewProduct().price"
              @input="setNewProduct({price: $event}); productsErrors.newProduct.touchPrice()"
              :error-messages="productsErrors.newProduct.price()"
              required
            ></v-text-field>
            <v-text-field
              label="Imagem"
              v-model="getNewProduct().image"
              @input="setNewProduct({image: $event}); productsErrors.newProduct.touchImage()"
              :error-messages="productsErrors.newProduct.image()"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <center>
              <v-avatar size="250" tile>
                <v-img :src="getNewProduct().image"></v-img>
              </v-avatar>
            </center>
          </v-col>
        </v-row>
        <v-row>
          <v-btn @click="productsErrors.newProduct.touch(); uploadProduct();">submit</v-btn>
        </v-row>
      </form>
    </v-app>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapGetters(["getNewProduct"]),
    ...mapActions(["setNewProduct", "uploadProduct"])
  },
  computed: {
    ...mapGetters(["productsErrors"])
  }
};
</script>