const baseUrl = 'http://localhost:3000/'

export default {
  state: {
    userInformation: [],
    userLoggedIn: []
  },

  mutations: {
    logInUser (state, response) {
      state.userInformation = response
      state.userLoggedIn = true
    },
    logOutUser (state) {
      state.userInformation = []
      state.userLoggedIn = []
    },
    deleteUser (state) {
      state.userInformation = []
      state.userLoggedIn = []
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
          .then(response => {
            if (response.token) {
              commit('logInUser', response)
              commit('clearOutPostState')
              commit('clearOutLikeState')
              commit('clearOutCommentsState')
              dispatch('loadAllPosts')
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    userLogOut ({ commit }) {
      commit('logOutUser')
    },
    userDelete ({ commit, dispatch, getters }, userid) {
      const userDeleteRequestOptions = {
        method: 'DELETE',
        headers: getters.getHeader
      }
      window.fetch(baseUrl + `api/auth/${userid}`, userDeleteRequestOptions)
        .then(() => {
          commit('deleteUser')
          dispatch('userLogOut')
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  getters: {
    userDetails: state => state.userInformation,
    isLoggedIn: state => state.userLoggedIn,
    getHeader: state => ({ Authorization: 'Bearer ' + state.userInformation.token })
  }
}
