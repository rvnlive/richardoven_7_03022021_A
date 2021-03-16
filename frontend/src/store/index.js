import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN SUCCESS'
const LOGOUT = 'LOGOUT'
export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
    users: {
      id: 1,
      email: 'test@test.com',
      fullName: 'John Doe',
      shortBio: 'This is me, noone else.',
      longBio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. 😏 At quibusdam, expedita distinctio non commodi qui cumque aliquam beatae exercitationem provident soluta? 🤔 Possimus, facilis quasi quidem tempora quos reiciendis aperiam distinctio? 😕',
      profileImage: require('../assets/test-images/johndoe.webp'),
      numberOfFriends: 0,
      followedFriends: '',
      numberOfGroupsJoined: 0,
      followedGroups: ''
    }
  },
  getters: {
    getUser (state) {
      return state.users
    }
  },
  mutations: {
    [LOGIN] (state) {
      state.pending = true
    },
    [LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true
      state.pending = false
    },
    [LOGOUT] (state) {
      state.isLoggedIn = false
    }
  },
  actions: {
    login ({ commit }, creds) {
      console.log('login...', creds)
      commit(LOGIN) // show spinner
      return new Promise(resolve => {
        setTimeout(() => {
          localStorage.setItem('token', 'JWT')
          commit(LOGIN_SUCCESS)
          resolve()
        }, 1000)
      })
    },
    logout ({ commit }) {
      localStorage.removeItem('token')
      commit(LOGOUT)
    }
  },
  modules: {
  }
})
