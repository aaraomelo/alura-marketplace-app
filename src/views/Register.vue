<template>
  <div>
    <v-app id="inspire" dark>
      <form class="ma-2">
        <v-text-field
          label="Nome"
          :value="getNewUser().name"
          @input="setNewUser({name: $event})"
        ></v-text-field>

        <v-text-field
          label="E-mail"
          :value="getNewUser().email"
          @input="setNewUser({email: $event})"
        ></v-text-field>

        <v-text-field
          label="Senha"
          :value="getNewUser().password"
          @input="setNewUser({password: $event})"
        ></v-text-field>

        <v-btn>submit</v-btn>
        <v-btn>clear</v-btn>
      </form>
    </v-app>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapGetters(["getNewUser"]),
    ...mapActions(["setNewUser"])
  }
};
</script>
