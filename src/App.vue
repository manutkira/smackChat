<template>
  <router-view />
</template>
<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('sttore', ['handleAuthStateChange'])
  },
  mounted(){
    this.handleAuthStateChange()
  }
}
</script>
