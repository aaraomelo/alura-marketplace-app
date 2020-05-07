<template>
  <v-app>
    <center>
      <v-container 
        v-for="(product,i) in products" 
        :key="i"
      >
        <v-card class="mx-auto" max-width="400">
          <v-img
            class="white--text align-end"
            height="200px"
            :src="product.image"
          ></v-img>

          <v-card-title class="pb-0">{{product.description}}</v-card-title>
          <v-card-text class="text--primary">
            <div>R$ {{product.price}}</div>
          </v-card-text>

        </v-card>
      </v-container>
    </center>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      products: "getProducts"
    })
  }
};
</script>