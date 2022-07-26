import { createStore } from 'vuex'

export default createStore({
  state: {
    roomId: null,
    users: []
  },
  getters: {
    getUsers: state => state.users
  },
  mutations: {
    setUsers(state, users) {
      state.users = users
    },
    setUser(state, user) {
      state.users.push(user)
    }
  },
  actions: {
  },
  modules: {
  }
})
