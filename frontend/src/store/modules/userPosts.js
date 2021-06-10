import { authHeader } from './helpers/authHeader'
const baseUrl = 'http://localhost:3000/'

export default {
  state: {
    postContent: []
  },

  mutations: {
    setPost (state, post) {
      state.postContent = post
    }
  },

  actions: {
    userPost ({ commit, dispatch }, { userid, post, upload }) {
      const postsAPI = 'api/posts/'
      return new Promise((resolve, reject) => {
        if (!post && !upload) {
          throw Error('Please add something to post!')
        } else {
          const postRequestOptions = {
            method: 'POST',
            headers: {
              ...authHeader(),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userid, post, upload })
          }
          window.fetch(baseUrl + postsAPI, postRequestOptions)
            .then(response => {
              return response.json()
            })
            .then(post => {
              if (post.postid) {
                commit('setPost', post)
                console.log(JSON.stringify(post))
              }
              resolve(post)
            })
            .catch(error => {
              reject(error)
              console.log(error)
            })
        }
      })
    }
  },

  getters: {
    getPostContent: state => state.postContent
  }
}
