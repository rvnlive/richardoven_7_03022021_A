const baseUrl = 'http://localhost:3000/'

export default {
  state: {
    allComments: []
  },

  mutations: {
    allComments (state, comments) {
      state.allComments = comments
    },
    clearOutCommentsState (state) {
      state.allComments = []
    }
  },

  actions: {
    createUserComment ({ commit, dispatch, getters }, { commentInput, userid, postid }) {
      const commentsAPI = 'api/comments/'
      return new Promise((resolve, reject) => {
        if (!commentInput && !userid && !postid) {
          throw Error('Please add something to comment!')
        } else {
          const postRequestOptions = {
            method: 'POST',
            headers: {
              ...getters.getHeader,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ commentInput, userid, postid })
          }
          window.fetch(baseUrl + commentsAPI, postRequestOptions)
            .then(response => {
              const id = postid
              dispatch('loadComments', id)
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        }
      })
    },
    loadComments ({ commit, getters }, id) {
      const allCommentsAPI = `api/comments/${id}`
      return new Promise((resolve, reject) => {
        const getRequestOptions = {
          method: 'GET',
          headers: getters.getHeader
        }
        window.fetch(baseUrl + allCommentsAPI, getRequestOptions)
          .then(result => result.json())
          .then(comments => {
            commit('allComments', comments)
            resolve(comments)
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    clearAllPostState ({ commit }) {
      commit('clearOutCommentsState')
    }
  },

  getters: {
    getAllComment: state => state.allComments
  }
}
