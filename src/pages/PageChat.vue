<template>
  <q-page class="flex column">
    <q-banner
      v-if="!otherUserDetails.online"
      class=" bg-grey-4 text-center">
      {{otherUserDetails.name}}
      is
      offline.
      </q-banner>
    
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="message in messages"
        :key="message.text"
        :name="message.from === 'me' ? userDetails.name : otherUserDetails.name"
        :text="[message.text]"
        :sent="message.from == 'me' ? true : false"
      />
    </div>
    <q-footer elevated>
        <q-toolbar>
          <q-form class="full-width" > 
            <q-input
              bg-color="white"
              rounded
              outlined
              v-model="newMessage"
              label="Message"
              dense>

            <template v-slot:after>
              <q-btn
                round
                dense
                type="submit"
                @click="sendMessage"
                flat
                color="white"
                icon="send" />
            </template>
           </q-input>
          </q-form>
        </q-toolbar>
      </q-footer>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import mixinsOtherDetails from '../mixins/mixins-other-details'
export default {
  mixins: [mixinsOtherDetails],
  data(){
    return{
      newMessage: '',
    }
  },
  methods: {
    ...mapActions('sttore', ['firebaseGetMessage', 'firebaseStopGetMessage', 'firebaseSendMessage']),
    sendMessage(){
      this.firebaseSendMessage({
        message:{
          text: this.newMessage,
          from: 'me',
        },
        otherUserId: this.$route.params.otherUserId
      })
      this.newMessage = ''
    }
  },
  computed: {
    ...mapState('sttore', ['messages', 'userDetails']),
    
  },
  mounted(){
    this.firebaseGetMessage(this.$route.params.otherUserId)
  },
  unmounted(){
    this.firebaseStopGetMessage()
  }
}
</script>
