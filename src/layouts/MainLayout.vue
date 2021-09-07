<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          to="/"
          dense
          icon="arrow_back"
          flat
          label="Back" />
        <q-toolbar-title class="absolute-center">
          {{title}}
        </q-toolbar-title>

          <q-btn
          v-if="!userDetails.userID"
          class="absolute-right q-pr-sm"
          to="/auth"
          no-caps
          dense
          icon="account_circle"
          flat
          label="Login" />
          <q-btn
          @click="logoutUser"
          v-if="userDetails.userID"
          class="absolute-right q-pr-sm"
          no-caps
          dense
          icon="account_circle"
          flat>LogOut <br>
          {{userDetails.name}}
          </q-btn>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import mixinsOtherDetails from 'src/mixins/mixins-other-details'
import { mapActions, mapState } from 'vuex'
export default {
  mixins: [mixinsOtherDetails],
  data(){
    const curPath = this.$route.fullPath
    const chat = curPath.includes('/chat')
    return{
      chat
    }
  },
  computed: {
    title(){
      let currentPath = this.$route.fullPath
      if(currentPath === '/') return 'SmackChat'
      else if(currentPath.includes('/chat')) return this.otherUserDetails.name
      else if(currentPath === '/auth') return 'Login'
    },
    ...mapState('sttore', ['userDetails'])
  },
  methods: {
    ...mapActions('sttore', ['logoutUser'])
  }
}
</script>

<style>
  .q-btn{
    line-height: 1.2;
  }
</style>