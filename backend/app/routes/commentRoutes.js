// Fast, minimalist web framework
const express = require('express')

// Forwarding the supported requests
const router = express.Router()

// Authorization helper
const auth = require('../helpers/authorization')

// Importing our commentController
const commentController = require('../controllers/commentController')

/** Basic logic is:
 * Creating a route for a method: from this end (/)
 * checking for authorization token, then
 * closing at the end with the function controller
 * attached with the containing function (commentController.createComment) **/
router.post('/', auth, commentController.createComment)
router.get('/:id', auth, commentController.getAllPostComments)
// router.delete('/:id', auth, commentController.deleteComment)

module.exports = router
