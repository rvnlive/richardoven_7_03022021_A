import { authHeader } from './helpers/authHeader'
const baseUrl = 'http://localhost:3000/'

export default {
  state: {
    allUser: []
  },

  mutations: {
    loadInUsers (state, users) {
      state.allUser = users
    },
    clearOutUsers (state) {
      state.allUser = []
    }
  },

  actions: {
    loadAllUser ({ commit }) {
      const getRequestOptions = {
        method: 'GET',
        headers: authHeader()
      }
      window.fetch(baseUrl + 'api/users', getRequestOptions)
        .then(result => result.json())
        .then(users => {
          commit('loadInUsers', users)
          return users
        })
        .catch(error => {
          console.log(error)
        })
    },
    clearAllUsers ({ commit }) {
      commit('clearOutUsers')
    }
  },

  getters: {
    loadUsers: state => state.allUser
  }
}
