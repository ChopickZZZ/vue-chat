import { createStore } from 'vuex'

export default createStore({
  state: {
    roomId: null,
    username: null,
    users: [],
    messages: []
  },
  getters: {
    getUsers: state => state.users,
    getMessages: state => state.messages
  },
  mutations: {
    setUsers(state, users) {
      state.users = users
    },
    setUser(state, user) {
      state.users.push(user)
    },
    setRoomIdAndUsername(state, { roomId, username }) {
      state.roomId = roomId
      state.username = username
    },
    addMessage(state, messageInfo) {
      const obj = { ...messageInfo }
      state.messages.push(obj)
    },
    loadAllMessages(state, messages) {
      state.messages = messages
    }
  },
  actions: {
  },
  modules: {
  }
})
