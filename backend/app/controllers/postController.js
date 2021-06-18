/** Lets import our helpers (middleware) first **/
/* For connection-status feedback */
const {
  errorMessage, successMessage, status
} = require('../helpers/status')

/** Importing table-models and creating relations:
 * Post made of
 * Uploads and/or Text
 * Post contains a
 * User, Text, Upload, View, Like and Comment **/
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

/**  Creating a post entry in database **/
/** Logic structured as:
 * 1. if Text but no Media, then...
 * 2. if Media but no Text, then...
 * 3. if Text and Media, then... **/
exports.createUserPost = (req, res) => {
  const url = req.protocol + '://' + req.get('host')
  const userid = req.body.userid
  const post = req.body.post
  const imageAlt = req.body.imageAlt
  const file = req.file

  if (post && (!file && !imageAlt)) { // 1. if Text but no Media, then...
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
  } else if (!post && (file && imageAlt)) { // 2. if Media but no Text, then...
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
  } else if (post && (file && imageAlt)) { // 3. if Text and Media, then...
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

/** Loading all post entries from database
 * combining ('include: []') with User, Text, Upload, View and Like tables **/
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

/** Loading a single post entry from database
 * combining ('include: []')
 * with User, Text, Upload, View, Like and Comment tables **/
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

/** Loading all post like entry from database
 * combining ('include: []')
 * with User tables **/
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

/** Creating a like entry in database **/
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

/** Deleting a like entry from database **/
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

/** Creating a post view entry in database **/
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

/** Deleting a post entry from database **/
// exports.deletePost = (req, res) => {
//   const postid = req.params.id
//   Posts.destroy({
//     where: { postid: postid },
//     include: [
//       {
//         model: Texts,
//         as: 'texts',
//         order: [['createdat', 'ASC']]
//       },
//       {
//         model: Uploads,
//         as: 'uploads',
//         order: [['createdat', 'ASC']]
//       },
//       {
//         model: Likes,
//         as: 'postlikes',
//         order: [['createdat', 'ASC']]
//       },
//       {
//         model: Views,
//         as: 'postviews',
//         order: [['createdat', 'ASC']]
//       },
//       {
//         model: Comments,
//         as: 'comments',
//         order: [['createdat', 'ASC']]
//       }
//     ]
//   })
//     .then(post => {
//       if (!post) {
//         errorMessage.error = 'Post does not exist'
//         return res.status(status.bad).send(errorMessage)
//       } else {
//         successMessage.data.message = 'Post has been deleted successfully'
//         return res.status(status.success).send(successMessage)
//       }
//     })
//     .catch(error => console.log('Operation was not successful ' + error))
// }
