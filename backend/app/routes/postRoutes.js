// Fast, minimalist web framework
const express = require('express')

// Forwarding the supported requests
const router = express.Router()

// Middleware for handling multipart/form-data - images
const multer = require('../helpers/multer-config')

// Authorization helper
const auth = require('../helpers/authorization')

// Importing our postController
const postController = require('../controllers/postController')

/** Basic logic is:
 * Creating a route for a method:
 * from this end (/)
 * checking for authorization token and data format (multer)
 * then closing at the end with the function controller
 * attached with the containing function (postController.getAllUsersPost) **/
router.get('/', auth, postController.getAllUsersPosts)
router.post('/', auth, multer, postController.createUserPost)
router.get('/:id', auth, postController.getOnePost)
router.post('/:id/post-view', auth, postController.viewPost)
router.post('/:id/give-like', auth, postController.givePostLike)
router.post('/:id/take-like', auth, postController.takePostLike)
router.get('/:id/postlikes', auth, postController.getAllPostLike)
// router.put("/:id", auth, multer, postController.modifyPost);
// router.delete('/:id', auth, postController.deletePost)

module.exports = router
