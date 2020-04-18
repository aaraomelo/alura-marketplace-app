<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/register">Register</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  methods: {
    ...mapActions(['verifyToken'])
  },
  mounted(){
    this.verifyToken();
  }
}
</script>
