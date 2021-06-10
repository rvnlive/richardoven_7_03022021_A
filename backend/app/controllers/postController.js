/** Lets import our helpers (middleware) first **/
/* For status feedback */
const {
  errorMessage, successMessage, status
} = require('../helpers/status')

require('dotenv').config()

/** Importing table-relations: Post made of Uploads and/or Text **/
// const { createPostFrame } = require('./postFrameController')
// const { addText } = require('./postTextController')
// const { uploadMedia } = require('./postUploadController')

/** Sequelizing data **/
const initModels = require('../models/init-models').initModels
const sequelize = require('../config/database.config')
console.log(initModels)
const models = initModels(sequelize)
const Posts = models.posts
const Uploads = models.uploads
const Texts = models.texts
// const fs = require('fs')

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
          res.status(status.created).send(successMessage)
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
          res.status(status.created).send(successMessage)
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
          res.status(status.created).send(successMessage)
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
    include: [Texts, Uploads]
  })
    .then(posts => {
      if (!posts) {
        errorMessage.error = 'Add text or media to create a post'
        return res.status(status.bad).send(errorMessage)
      } else {
        res.json(posts)
      }
    })
    .catch(error => console.log('Operation was not successful ' + error))
}

// exports.getOnePost = async (req, res) => {
//   try {
//     const post = await Post.findOne({ where: { id: req.params.id } })
//     res.status(200).json(post)
//   } catch (err) {
//     console.log(err)
//     res.status(404).json({ error })
//   }
// }

// exports.modifyPost = async (req, res) => {
//   let post = await Post.findOne({ where: { id: req.params.id } })

//   if (req.file) {
//     const filename = post.image.split('/images/')[1]
//     fs.unlink('images/' + filename, (error) => {
//       if (error) {
//         console.log(error)
//       } else {
//         console.log('successfully deleted local image')
//       }
//     })
//     const url = req.protocol + '://' + req.get('host')
//     post = {
//       title: req.body.title,
//       description: req.body.description,
//       image: url + '/images/' + req.file.filename,
//       hasBeenRead: req.body.hasBeenRead
//     }
//   } else {
//     post = {
//       title: req.body.title,
//       description: req.body.description,
//       image: req.body.image,
//       hasBeenRead: req.body.hasBeenRead
//     }
//   }

//   try {
//     const response = await Post.update(post, { where: { id: req.params.id } })
//     res.status(201).json({ message: 'Post updated successfully!' })
//   } catch (err) {
//     console.log(err)
//     return res.status(500).json({ message: err.message })
//   }
// }

// exports.deletePost = async (req, res) => {
//   try {
//     const post = await Post.findOne({ where: { id: req.params.id } })
//     const filename = post.image.split('/images/')[1]
//     fs.unlink('images/' + filename, () => {
//       Comment.destroy({ where: { postId: req.params.id } })
//       Post.destroy({ where: { id: req.params.id } })
//       res.status(200).json({ message: 'Post deleted successfully!' })
//     })
//   } catch (err) {
//     console.log(err)
//     res.status(404).json({ error })
//   }
// }

// exports.viewPost = async (req, res) => {
//   try {
//     await Post.update(
//       {
//         hasBeenRead: sequelize.fn(
//           'array_append',
//           sequelize.col('hasBeenRead'),
//           req.body.hasBeenRead
//         )
//       },
//       { where: { id: req.params.id } }
//     )
//     const post = await Post.findOne({ where: { id: req.params.id } })
//     console.log(post)
//     res.status(201).json(post)
//   } catch (err) {
//     console.log(err)
//     return res.status(500).json({ message: err.message })
//   }
// }
