<template>
  <div>
    <v-app id="inspire" dark>
      <form class="ma-2">
        <v-text-field
          label="Nome"
          v-model="getNewUser().name"
          :error-messages="Errors.newUser.name()"
          :counter="32"
          @input="setNewUser({name: $event})"
          required
        ></v-text-field>

        <v-text-field
          label="E-mail"
          v-model="getNewUser().email"
          @input="setNewUser({email: $event})"
          :error-messages="Errors.newUser.email()"
          required
        ></v-text-field>

        <v-text-field
          label="Senha"
          v-model="getNewUser().password"
          @input="setNewUser({password: $event})"
          :error-messages="Errors.newUser.password()"
          required
        ></v-text-field>
        <v-btn @click="registerNewUser"> submit </v-btn>
      </form>
    </v-app>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapGetters(["getNewUser"]),
    ...mapActions(["setNewUser", "registerNewUser"]),
  },
  computed: {
    ...mapGetters(['Errors'])
  }
};
</script>