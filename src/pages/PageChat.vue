<template>
  <q-page 
  ref="pageChat"
  class="page-chat flex column">
    <q-banner
      v-if="!otherUserDetails.online"
      class=" bg-grey-4 text-center fixed-top">
      {{otherUserDetails.name}}
      is
      offline.
      </q-banner>
    
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="(message, key) in messages"
        :key="key"
        :name="message.from == 'me' ? userDetails.name : otherUserDetails.name"
        :text="[message.text]"
        :sent="message.from == 'me' ? true : false"
        :bg-color="message.from == 'me' ? 'light-green' : 'white'"
      />
    </div>
    <q-footer elevated>
        <q-toolbar>
          <q-form class="full-width" > 
            <q-input
              bg-color="white"
              rounded
              outlined
              ref="newMessage"
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
    computed: {
      ...mapState('sttore', ['messages', 'userDetails']),
      
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
      this.clearMessage()
    },
    clearMessage(){
      this.newMessage = '';
      this.$refs.newMessage.focus()
    }
    // scrollToBottom(){
    //   let pageChat = this.$refs.pageChat.$el
    //   setTimeout(()=> {
    //     window.scrollTo(0, pageChat.scrollHeight)
    //   }, 20)
    // }
  },
    // watch: {
    //   messages(val){
    //     console.log(Object.keys(val));
    //     if(Object.keys(val).length !== 0){
    //       this.scrollToBottom()
    //     }
    //   }
    // },
  mounted(){
    this.firebaseGetMessage(this.$route.params.otherUserId)
  },
  unmounted(){
    this.firebaseStopGetMessage()
  },
}
</script>

<style>
.page-chat{
  background-color: #e2dfd5;
}
.page-chat:after{
  content: '';
  display: block;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 0;
  opacity: 0.1;
  background:
radial-gradient(circle at 50% 59%, #D2CAAB 3%, #364E27 4%, #364E27 11%, rgba(54,78,39,0) 12%, rgba(54,78,39,0)) 50px 0,
radial-gradient(circle at 50% 41%, #364E27 3%, #D2CAAB 4%, #D2CAAB 11%, rgba(210,202,171,0) 12%, rgba(210,202,171,0)) 50px 0,
radial-gradient(circle at 50% 59%, #D2CAAB 3%, #364E27 4%, #364E27 11%, rgba(54,78,39,0) 12%, rgba(54,78,39,0)) 0 50px,
radial-gradient(circle at 50% 41%, #364E27 3%, #D2CAAB 4%, #D2CAAB 11%, rgba(210,202,171,0) 12%, rgba(210,202,171,0)) 0 50px,
radial-gradient(circle at 100% 50%, #D2CAAB 16%, rgba(210,202,171,0) 17%),
radial-gradient(circle at 0% 50%, #364E27 16%, rgba(54,78,39,0) 17%),
radial-gradient(circle at 100% 50%, #D2CAAB 16%, rgba(210,202,171,0) 17%) 50px 50px,
radial-gradient(circle at 0% 50%, #364E27 16%, rgba(54,78,39,0) 17%) 50px 50px;
background-color:#63773F;
background-size:100px 100px;
}
.q-message{
  z-index: 1;
}
.q-banner{
  top: 50px;
  z-index: 2;
  opacity: 0.8;
}
</style>