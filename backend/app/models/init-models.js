const DataTypes = require('sequelize').DataTypes
const _users = require('./userModel')
const _posts = require('./postModelParts/postFrameModel')
const _postlikes = require('./postModelParts/postLikeModel')
const _uploads = require('./postModelParts/postMediaModel')
const _texts = require('./postModelParts/postTextModel')
const _comments = require('./commentModel')
const _postview = require('./postviewModel')

function initModels (sequelize) {
  const users = _users(sequelize, DataTypes)
  const posts = _posts(sequelize, DataTypes)
  const postview = _postview(sequelize, DataTypes)
  const postlikes = _postlikes(sequelize, DataTypes)
  const comments = _comments(sequelize, DataTypes)
  const uploads = _uploads(sequelize, DataTypes)
  const texts = _texts(sequelize, DataTypes)

  // Association for POSTS
  posts.belongsTo(users, { as: 'user', foreignKey: 'userid' })
  users.hasMany(posts, { as: 'posts', foreignKey: 'userid' })

  // Association for POSTVIEWS
  postview.belongsTo(users, { as: 'user', foreignKey: 'userid' })
  users.hasMany(postview, { as: 'postviews', foreignKey: 'userid' })
  postview.belongsTo(posts, { as: 'post', foreignKey: 'postid' })
  posts.hasMany(postview, { as: 'postviews', foreignKey: 'postid' })

  // Association for POSTLIKES
  postlikes.belongsTo(users, { as: 'user', foreignKey: 'userid' })
  users.hasMany(postlikes, { as: 'postlikes', foreignKey: 'userid' })
  postlikes.belongsTo(posts, { as: 'post', foreignKey: 'postid' })
  posts.hasMany(postlikes, { as: 'postlikes', foreignKey: 'postid' })

  // Association for UPLOADS
  uploads.belongsTo(posts, { as: 'upload', foreignKey: 'postid' })
  posts.hasMany(uploads, { as: 'uploads', foreignKey: 'postid' })

  // Association for TEXTS
  texts.belongsTo(posts, { as: 'text', foreignKey: 'postid' })
  posts.hasMany(texts, { as: 'texts', foreignKey: 'postid' })

  // Association for COMMENTS
  comments.belongsTo(posts, { as: 'post', foreignKey: 'postid' })
  posts.hasMany(comments, { as: 'comments', foreignKey: 'postid' })
  comments.belongsTo(users, { as: 'user', foreignKey: 'userid' })
  users.hasMany(comments, { as: 'comments', foreignKey: 'userid' })

  return {
    users,
    posts,
    postview,
    postlikes,
    comments,
    uploads,
    texts
  }
}
module.exports = initModels
module.exports.initModels = initModels
module.exports.default = initModels
