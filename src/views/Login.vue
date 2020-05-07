<template>
  <div>
    <v-app id="inspire" dark>
      <form class="ma-2">
        <v-text-field
          label="Email"
          v-model="getLoginUser().email"
          @input="setLoginUser({email: $event}); usersErrors.loginUser.touchEmail()"
          :error-messages="usersErrors.loginUser.email()"
          required
          :counter="32"
        ></v-text-field>

        <v-text-field
          label="Senha"
          v-model="getLoginUser().password"
          @input="setLoginUser({password: $event}); usersErrors.loginUser.touchPassword()"
          :error-messages="usersErrors.loginUser.password()"
          required
        ></v-text-field>

         <v-btn @click="usersErrors.loginUser.touch(); loginUser()"> submit </v-btn>
      </form>
    </v-app>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapGetters(["getLoginUser"]),
    ...mapActions(["setLoginUser","loginUser"])
  },
  computed: {
    ...mapGetters(['usersErrors'])
  }
};
</script>