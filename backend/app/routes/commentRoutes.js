const express = require('express')
const router = express.Router()
const auth = require('../helpers/authorization')
const commentController = require('../controllers/commentController')

router.post('/', auth, commentController.createComment)
router.get('/:id', auth, commentController.getAllPostComments)
router.delete('/:id', auth, commentController.deleteComment)

module.exports = router
