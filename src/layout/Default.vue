<template>
  <v-app>
    <v-toolbar color="#FFFF66" flat prominent>
       <v-toolbar-title v-if="getAuth" >Olá {{getUser.name}}, seja bem vindo!</v-toolbar-title>
      <template v-slot:extension>
        <v-btn text to="/">Comprar</v-btn>
        <v-btn v-if="getAuth" text to="/sell">Vender</v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="!getAuth" text to="/register">Crie sua conta</v-btn>
        <v-btn v-if="!getAuth" text to="/login">Entre</v-btn>
        <v-btn v-if="getAuth" text @click="logoutUser" >Sair</v-btn>
        <v-btn v-if="getAuth" icon> <v-icon>mdi-cart</v-icon></v-btn>
      </template>
    </v-toolbar>

    <v-container>
      <slot></slot>
    </v-container>
<v-spacer></v-spacer>
    <v-footer absolute center>
      {{ new Date().getFullYear() }} —
      <strong>Alura market place</strong>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  methods:{
    ...mapActions(['logoutUser'])
  },
  computed: {
    ...mapGetters(["getAuth", "getUser"])
  },
  data() {
    return {};
  }
};
</script>

<style>
* {
  text-transform: none !important;
}
</style>