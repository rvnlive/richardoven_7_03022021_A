const baseUrl = 'http://localhost:3000/'

export default {
  state: {
    allUserContent: [],
    singlePost: []
  },

  mutations: {
    allPosts (state, posts) {
      // With this mutation we are going to import all posts into our state
      // then we are going to sort them by 'postid' from lowest (last) to newest (first)
      state.allUserContent = posts
      let zero = 0
      state.allUserContent.sort((a, b) => {
        if (a.postid > b.postid) {
          zero = -1
        } else if (a.postid < b.postid) {
          zero = 1
        }
        return zero
      })
    },
    onePost (state, post) {
      state.singlePost = post
    },
    clearOutPostState (state) {
      state.postContent = []
      state.singlePost = {}
    }
  },

  actions: {
    createUserPost ({ commit, dispatch, getters }, { formData }) {
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
              ...getters.getHeader
              // 'Content-Type': 'multipart/form-data'
              // 'Content-Type': 'application/json'
            },
            body: formData
          }
          window.fetch(baseUrl + postsAPI, postRequestOptions)
            .then(response => {
              resolve(response)
              dispatch('loadAllPosts')
            })
            .catch(error => {
              reject(error)
            })
        }
      })
    },
    loadAllPosts ({ commit, getters }) {
      const getRequestOptions = {
        method: 'GET',
        headers: getters.getHeader
      }
      window.fetch(baseUrl + 'api/posts/', getRequestOptions)
        .then(result => result.json())
        .then(posts => {
          commit('allPosts', posts)
          return posts
        })
        .catch(error => {
          console.log(error)
        })
    },
    loadOnePost ({ commit, dispatch, getters }, { id }) {
      const singlePostAPI = `api/posts/${id}`
      return new Promise((resolve, reject) => {
        if (!id) {
          console.log(id)
          throw Error('Choose an existing post!')
        } else {
          const postRequestOptions = {
            method: 'GET',
            headers: getters.getHeader
          }
          window.fetch(baseUrl + singlePostAPI, postRequestOptions)
            .then(result => result.json())
            .then(post => {
              dispatch('loadComments', id)
              commit('onePost', post)
              dispatch('loadAllLikes', id)
              resolve(post)
            })
            .catch(error => {
              reject(error)
            })
        }
      })
    },
    onPostview ({ commit, dispatch, getters }, { userid, id }) {
      const postviewAPI = `api/posts/${id}/post-view`
      return new Promise((resolve, reject) => {
        if (!userid || !id) {
          throw Error('Unexpected happened!')
        } else {
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
          window.fetch(baseUrl + postviewAPI, postLikeRequestOptions)
            .then(response => {
              dispatch('loadAllPosts')
              dispatch('loadAllLikes', id)
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        }
      })
    },
    clearAllPostState ({ commit }) {
      commit('clearOutPostState')
    }
  },

  getters: {
    loadAllUserContent: state => state.allUserContent,
    loadChosenPost: state => state.singlePost
  }
}
