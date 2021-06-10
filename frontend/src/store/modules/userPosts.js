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
    userPost ({ commit, dispatch }, { formData }) {
      const postsAPI = 'api/posts/'
      return new Promise((resolve, reject) => {
        const post = formData.get('post')
        const upload = formData.get('upload')
        const file = formData.get('image')
        if (!post && !upload && !file) {
          throw Error('Please add something to post!')
        } else {
          const postRequestOptions = {
            method: 'POST',
            headers: {
              ...authHeader()
              // 'Content-Type': 'multipart/form-data'
              // 'Content-Type': 'application/json'
            },
            body: formData
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
    loadPostContent: state => state.postContent
  }
}
