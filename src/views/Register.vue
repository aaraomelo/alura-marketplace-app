<template>
  <div>
    <v-app id="inspire" dark>
      <form class="ma-2">
        <v-text-field
          label="Nome"
          v-model="getNewUser().name"
          :error-messages="usersErrors.newUser.name()"
          :counter="32"
          @input="setNewUser({name: $event}); usersErrors.newUser.touchName()"
          required
        ></v-text-field>

        <v-text-field
          label="E-mail"
          v-model="getNewUser().email"
          @input="setNewUser({email: $event}); usersErrors.newUser.touchEmail()"
          :error-messages="usersErrors.newUser.email()"
          required
        ></v-text-field>

        <v-text-field
          label="Senha"
          v-model="getNewUser().password"
          @input="setNewUser({password: $event}); usersErrors.newUser.touchPassword()"
          :error-messages="usersErrors.newUser.password()"
          required
        ></v-text-field>
        <v-btn @click="usersErrors.newUser.touch(); registerNewUser()"> submit </v-btn>
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
    ...mapGetters(['usersErrors'])
  }
};
</script>