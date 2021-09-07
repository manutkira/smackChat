export default {
    computed:{
        otherUserDetails(){
            if(this.$store.state.sttore.users[this.$route.params.otherUserId]){
                return this.$store.state.sttore.users[this.$route.params.otherUserId];
            }
            return {}
          }
    }
}