import {firebaseDb, firebaseAuth} from '../boot/firebase'
import Vue from 'vue'

let messagesRef;

const state ={
    userDetails: {},
    users: {},
    messages: {}
}
const mutations = {
    setUserDetails(state, payload){
        state.userDetails = payload
    },
    addUser(state, payload){
        state.users[payload.userID] = payload.userDetails
    },
    updateUser(state, payload){
        Object.assign(state.users[payload.userID], payload.userDetails)
    },
    addMessage(state, payload){
        state.messages[payload.messageId] = payload.messageDetails
    },
    clearMessages(state){
        state.messages = {}
    }
}
const actions = {
    registerUser({}, payload){
        firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password).then(response => {
            const userID = firebaseAuth.currentUser.uid
            firebaseDb.ref('user/' + userID).set({
                name: payload.name,
                email: payload.email,
                online: true
            })
        }).catch(err => {
            console.log(err.message);
        })
    },
    loginUser({}, payload){
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password).then(response => {
        }).catch(err => {
            console.log(err.message);
        })
    },
    logoutUser(){
        firebaseAuth.signOut()
    },
    handleAuthStateChange({commit, dispatch, state}){
        firebaseAuth.onAuthStateChanged(user => {
            if(user){
                const userID = firebaseAuth.currentUser.uid
                firebaseDb.ref('user/' + userID).once('value', snapshot => {
                    const userDetails = snapshot.val()
                    commit('setUserDetails', {
                        name: userDetails.name,
                        email: userDetails.email,
                        userID: userID
                    })
                })
                dispatch('firebaseUpdateUser', {
                    userID: userID,
                    update: {
                        online: true
                    }
                })
                dispatch('firebaseGetUser')
                this.$router.push('/')
            }else{
                dispatch('firebaseUpdateUser', {
                    userID: state.userDetails.userID,
                    update: {
                        online: false,
                    }
                })
                commit('setUserDetails', {})
                this.$router.replace('/auth')
            }
        })
    },
    firebaseUpdateUser({}, payload){
        if(payload.userID){
            firebaseDb.ref('user/' + payload.userID).update(payload.update)
        }
    },
    firebaseGetUser({commit}){
        firebaseDb.ref('user').on('child_added', snapshot => {
            let userDetails = snapshot.val()
            let userID = snapshot.key
            commit('addUser', {
                userID,
                userDetails
            })
        })
        firebaseDb.ref('user').on('child_changed', snapshot => {
            let userDetails = snapshot.val()
            let userID = snapshot.key
            commit('updateUser', {
                userID,
                userDetails
            })
        })
    },
    firebaseGetMessage({commit, state}, otherUserId){
        let userID = state.userDetails.userID
       messagesRef = firebaseDb.ref('chats/' + userID + '/' + otherUserId)
       messagesRef.on('child_added', snapshot => {
            let messageDetails = snapshot.val()
            let messageId = snapshot.key
            commit('addMessage', {
                messageDetails,
                messageId
            })
        })
    },
    firebaseStopGetMessage({commit}){
        if(messagesRef){
            messagesRef.off('child_added')
            commit('clearMessages')
        }
    },
    firebaseSendMessage({}, payload){
        firebaseDb.ref('chats/' + state.userDetails.userID + '/' + payload.otherUserId).push(payload.message)

        payload.message.from = 'them'
        firebaseDb.ref('chats/' + payload.otherUserId + '/' + state.userDetails.userID).push(payload.message)
    }
}

const getters = {
    users: state => {
        const usersFilter = {}
        Object.keys(state.users).forEach(key => {
            if(key !== state.userDetails.userID){
                usersFilter[key] = state.users[key]
            }
        })
        return usersFilter
    }
}

export default{
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}