<template>
  <div>
    <v-toolbar color="#FFFF66" flat prominent>
      <v-text-field
        class="mx-4"
        flat
        hide-details
        label="Search"
        prepend-inner-icon="search"
        solo-inverted
      ></v-text-field>

      <template v-slot:extension>
        <v-btn text to="/sell">Vender</v-btn>
        <v-spacer></v-spacer>
        <v-btn text to="/register">Crie sua conta</v-btn>
        <v-btn text to="/login">Entre</v-btn>
        <v-btn icon>
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </template>
    </v-toolbar>

    <v-container>
      <slot></slot>
    </v-container>

    <v-footer
      absolute
      center
    >
        {{ new Date().getFullYear() }} — <strong>Alura market place</strong>
    </v-footer>

  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getAuth", "getUser"])
  },
  data() {
    return {
    };
  }
};
</script>

<style>
* {
  text-transform: none !important;
}
</style>