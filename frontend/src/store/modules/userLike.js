const baseUrl = 'http://localhost:3000/'

export default {
  state: {
    allLikes: []
  },

  mutations: {
    loadLikes (state, likes) {
      state.allLikes = likes
    },
    clearOutLikeState (state) {
      state.allLikes = []
    }
  },

  actions: {
    giveLike ({ commit, dispatch, getters }, { userid, id }) {
      const likeAPI = `api/posts/${id}/give-like`
      return new Promise((resolve, reject) => {
        const details = {
          id, userid
        }
        const postLikeRequestOptions = {
          method: 'POST',
          headers: {
            ...getters.getHeader,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(details)
        }
        window.fetch(baseUrl + likeAPI, postLikeRequestOptions)
          .then(response => {
            dispatch('loadAllLikes', id)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    takeLike ({ commit, dispatch, getters }, { userid, id }) {
      const likeAPI = `api/posts/${id}/take-like`
      return new Promise((resolve, reject) => {
        const details = {
          id, userid
        }
        const postLikeRequestOptions = {
          method: 'POST',
          headers: {
            ...getters.getHeader,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(details)
        }
        window.fetch(baseUrl + likeAPI, postLikeRequestOptions)
          .then(response => {
            dispatch('loadAllLikes', id)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    loadAllLikes ({ commit, dispatch, getters }, id) {
      const postLikesAPI = `api/posts/${id}/postlikes`
      return new Promise((resolve, reject) => {
        const postRequestOptions = {
          method: 'GET',
          headers: getters.getHeader
        }
        window.fetch(baseUrl + postLikesAPI, postRequestOptions)
          .then(result => result.json())
          .then(likes => {
            commit('loadLikes', likes)
            resolve(likes)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    clearAllLikeState ({ commit }) {
      commit('clearOutLikeState')
    }
  },

  getters: {
    getAllLikes: state => state.allLikes
  }
}
