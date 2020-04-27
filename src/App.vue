<template>
  <div id="app">
    <Default>
      <router-view/>
    </Default>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import Default from './layout/Default'

export default {
  components:{
    Default
  },
  methods: {
    ...mapActions(['verifyToken'])
  },
  mounted(){
    this.verifyToken();
  }
}
</script>
