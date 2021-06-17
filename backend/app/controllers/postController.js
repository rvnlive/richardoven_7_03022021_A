/** Lets import our helpers (middleware) first **/
/* For status feedback */
const {
  errorMessage, successMessage, status
} = require('../helpers/status')

/** Importing table-relations: Post made of Uploads and/or Text **/
// const { createPostFrame } = require('./postFrameController')
// const { addText } = require('./postTextController')
// const { uploadMedia } = require('./postUploadController')

/** Sequelizing data **/
const initModels = require('../models/init-models').initModels
const sequelize = require('../config/database.config')
console.log(initModels)
const models = initModels(sequelize)
const Users = models.users
const Posts = models.posts
const Uploads = models.uploads
const Likes = models.postlikes
const Views = models.postview
const Comments = models.comments
const Texts = models.texts

/// /////////////////////////////////////////// //

exports.createUserPost = (req, res) => {
  const url = req.protocol + '://' + req.get('host')
  const userid = req.body.userid
  const post = req.body.post
  const imageAlt = req.body.imageAlt
  const file = req.file

  if (post && (!file && !imageAlt)) {
    const postTextContent = {
      userid: userid,
      texts: [{
        textcontent: post
      }]
    }

    Posts
      .create(postTextContent, {
        include: [{
          model: Texts, as: 'texts'
        }]
      })
      .then((result) => {
        const textPost = result
        console.log(textPost)
        if (textPost) {
          return res.json({ textPost })
        } else {
          errorMessage.error = 'Something went wrong!'
          return res.status(status.conflict).send(errorMessage)
        }
      })
      .catch(error => console.log('Operation was not successful ' + error)
      )
  } else if (!post && (file && imageAlt)) {
    const postMediaContent = {
      userid: userid,
      uploads: [{
        imagesrc: url + '/images/' + file.filename,
        imagealt: imageAlt
      }]
    }

    Posts
      .create(postMediaContent, {
        include: [{
          model: Uploads, as: 'uploads'
        }]
      })
      .then((result) => {
        const mediaPost = result
        console.log(mediaPost)
        if (mediaPost) {
          return res.json({ mediaPost })
        } else {
          errorMessage.error = 'Something went wrong!'
          return res.status(status.conflict).send(errorMessage)
        }
      })
      .catch(error => console.log('Operation was not successful ' + error)
      )
  } else if (post && (file && imageAlt)) {
    const postMultiContent = {
      userid: userid,
      texts: [{
        textcontent: post
      }],
      uploads: [{
        imagesrc: url + '/images/' + file.filename,
        imagealt: imageAlt
      }]
    }

    Posts
      .create(postMultiContent, {
        include: [{
          model: Texts,
          as: 'texts'
        },
        {
          model: Uploads,
          as: 'uploads'
        }
        ]
      })
      .then((result) => {
        const multiPost = result
        console.log(multiPost)
        if (multiPost) {
          return res.json({ multiPost })
        } else {
          errorMessage.error = 'Something went wrong!'
          return res.status(status.conflict).send(errorMessage)
        }
      })
      .catch(error => console.log('Operation was not successful ' + error)
      )
  }
}

exports.getAllUsersPosts = (req, res) => {
  Posts.findAll({
    include: [
      {
        model: Users,
        as: 'user',
        attributes: {
          exclude: ['password', 'email', 'createdat', 'updatedat']
        },
        order: [['createdat', 'ASC']]

      },
      {
        model: Texts,
        as: 'texts',
        order: [['createdat', 'ASC']]
      },
      {
        model: Uploads,
        as: 'uploads',
        order: [['createdat', 'ASC']]
      },
      {
        model: Views,
        as: 'postviews',
        order: [['createdat', 'ASC']]
      },
      {
        model: Likes,
        as: 'postlikes',
        order: [['createdat', 'ASC']]
      }]
  })
    .then(posts => {
      if (!posts) {
        errorMessage.error = 'Add text or media to create a post'
        return res.status(status.bad).send(errorMessage)
      } else {
        return res.json(posts)
      }
    })
    .catch(error => console.log('Operation was not successful ' + error))
}

exports.getOnePost = (req, res) => {
  const postid = req.params.id
  Posts.findAll({
    where: { postid: postid },
    include: [
      {
        model: Users,
        as: 'user',
        attributes: {
          exclude: ['password', 'email', 'createdat', 'updatedat']
        },
        order: [['createdat', 'ASC']]

      },
      {
        model: Texts,
        as: 'texts',
        order: [['createdat', 'ASC']]
      },
      {
        model: Uploads,
        as: 'uploads',
        order: [['createdat', 'ASC']]
      },
      {
        model: Likes,
        as: 'postlikes',
        order: [['createdat', 'ASC']]
      },
      {
        model: Views,
        as: 'postviews',
        order: [['createdat', 'ASC']]
      },
      {
        model: Comments,
        as: 'comments',
        order: [['createdat', 'ASC']]
      }
    ]
  })
    .then(post => {
      if (!post) {
        errorMessage.error = 'Post does not exist'
        return res.status(status.bad).send(errorMessage)
      } else {
        return res.json(post)
      }
    })
    .catch(error => console.log('Operation was not successful ' + error))
}

exports.getAllPostLike = (req, res) => {
  const postid = req.params.id
  Likes.findAll({
    where: { postid: postid },
    include: [
      {
        model: Users,
        as: 'user',
        attributes: {
          exclude: ['password', 'email', 'createdat', 'updatedat']
        },
        order: [['createdat', 'ASC']]

      }]
  })
    .then(likes => {
      if (!likes) {
        errorMessage.error = 'No likes to load'
        return res.status(status.bad).send(errorMessage)
      } else {
        return res.json(likes)
      }
    })
    .catch(error => console.log('Operation was not successful ' + error))
}

exports.givePostLike = (req, res) => {
  const postid = req.body.id
  const userid = req.body.userid
  Likes.findOrCreate({
    where: { userid: userid, postid: postid },
    defaults: {
      postid: postid,
      userid: userid
    }
  })
    .then((result) => {
      const [like, created] = result
      console.log(like)
      if (created) {
        return res.json({ likeCreated: created })
      } else {
        const errorMessage = 'Has been liked already!'
        return res.status(status.conflict).send(errorMessage)
      }
    })
    .catch(error => console.log('Operation was not successful ' + error)
    )
}

exports.takePostLike = (req, res) => {
  const postid = req.body.id
  const userid = req.body.userid
  Likes.destroy({
    where: { userid: userid, postid: postid }
  })
    .then((result) => {
      console.log(result)
      const successMessage = 'Like has been taken successfully'
      return res.status(status.success).send(successMessage)
    })
    .catch(error => console.log('Operation was not successful ' + error))
}

exports.viewPost = (req, res) => {
  const postid = req.body.id
  const userid = req.body.userid
  Views.findOrCreate({
    where: { userid: userid, postid: postid },
    defaults: {
      postid: postid,
      userid: userid
    }
  })
    .then((result) => {
      const [view, created] = result
      console.log(view)
      if (created) {
        return res.json({ viewCreated: created })
      } else {
        errorMessage.error = 'Has been viewed already!'
        return res.json(errorMessage)
      }
    })
    .catch(error => console.log('Operation was not successful ' + error)
    )
}

exports.deletePost = (req, res) => {
  const postid = req.params.id
  Posts.destroy({
    where: { postid: postid },
    include: [
      {
        model: Texts,
        as: 'texts',
        order: [['createdat', 'ASC']]
      },
      {
        model: Uploads,
        as: 'uploads',
        order: [['createdat', 'ASC']]
      },
      {
        model: Likes,
        as: 'postlikes',
        order: [['createdat', 'ASC']]
      },
      {
        model: Views,
        as: 'postviews',
        order: [['createdat', 'ASC']]
      },
      {
        model: Comments,
        as: 'comments',
        order: [['createdat', 'ASC']]
      }
    ]
  })
    .then(post => {
      if (!post) {
        errorMessage.error = 'Post does not exist'
        return res.status(status.bad).send(errorMessage)
      } else {
        successMessage.data.message = 'Post has been deleted successfully'
        return res.status(status.success).send(successMessage)
      }
    })
    .catch(error => console.log('Operation was not successful ' + error))
}
