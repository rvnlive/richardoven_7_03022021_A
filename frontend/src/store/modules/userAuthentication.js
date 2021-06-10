import { authHeader } from './helpers/authHeader'
const baseUrl = 'http://localhost:3000/'

export default {
  state: {
    userInformation: [],
    userToken: ''
  },

  mutations: {
    logInUser (state, user, token) {
      state.userInformation = user
      state.userToken = token
    },
    logOutUser (state) {
      state.userInformation = []
      state.userToken = ''
    },
    deleteUser (state) {
      state.userInformation = []
      state.userToken = ''
    }
  },

  actions: {
    userLogIn ({ commit, dispatch }, { email, password }) {
      return new Promise((resolve, reject) => {
        const logInRequestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        }
        window.fetch(baseUrl + 'api/auth/login', logInRequestOptions)
          .then(response => {
            return response.json()
          })
          .then(user => {
            if (user.token) {
              const token = user.token
              window.localStorage.setItem('userInformation', JSON.stringify(user))
              commit('logInUser', user, token)
            }
            resolve(user)
          })
          .catch(error => {
            reject(error)
            console.log(error)
          })
      })
    },
    userLogOut ({ commit }) {
      window.localStorage.removeItem('userInformation')
      console.clear()
      commit('logOutUser')
    },
    userDelete ({ commit, dispatch }, userid) {
      const userDeleteRequestOptions = {
        method: 'DELETE',
        headers: authHeader()
      }
      window.fetch(baseUrl + `api/auth/${userid}`, userDeleteRequestOptions)
        .then(() => {
          commit('deleteUser')
          window.localStorage.removeItem('userInformation')
          dispatch('logOutUser')
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  getters: {
    isAuthenticated: state => !!state.userToken,
    userDetails: state => state.userInformation
  }
}
