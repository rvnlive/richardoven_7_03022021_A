/** Lets import our helpers (middleware) first **/
/* For status feedback */
const {
  errorMessage, successMessage, status
} = require('../helpers/status')

/** Importing table-relations: Post made of Uploads and/or Text **/
/** Sequelizing data **/
const initModels = require('../models/init-models').initModels
const sequelize = require('../config/database.config')
console.log(initModels)
const models = initModels(sequelize)
const Comments = models.comments
const Users = models.users
/// /////////////////////////////////////////// //

exports.createComment = (req, res) => {
  const { commentInput, userid, postid } = req.body
  Comments
    .create({
      userid: userid,
      postid: postid,
      comment: commentInput
    })
    .then(comment => {
      if (!comment) {
        const errorMessage = 'Comment has not been created'
        return res.status(status.bad).send(errorMessage)
      } else {
        return res.json({ comment })
      }
    })
    .catch(error => {
      console.log('Operation was not successful ' + error)
      const errorMessage = 'Comment has not been created: ' + error
      return res.status(status.bad).send(errorMessage)
    })
}

exports.getAllPostComments = (req, res) => {
  const postid = req.params.id
  Comments.findAll({
    where: { postid: postid },
    include: [
      {
        model: Users,
        as: 'user',
        attributes: {
          exclude: ['password', 'email', 'createdat', 'updatedat']
        },
        order: [['createdat', 'ASC']]
      }
    ]
  })
    .then(comments => {
      if (!comments) {
        errorMessage.error = 'There are not any comments.'
        return res.status(status.bad).send(errorMessage)
      } else {
        return res.json({ comments })
      }
    })
    .catch(error => console.log('Operation was not successful ' + error))
}

exports.deleteComment = (req, res) => {
  const commentid = req.params.id
  Comments.destroy({
    where: { commentid: commentid }
  })
    .then(comment => {
      if (!comment) {
        errorMessage.error = 'Comment does not exist'
        return res.status(status.bad).send(errorMessage)
      } else {
        successMessage.data.message = 'Comment has been deleted successfully'
        return res.status(status.success).send(successMessage)
      }
    })
    .catch(error => console.log('Operation was not successful ' + error))
}
