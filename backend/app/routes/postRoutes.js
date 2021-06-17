const express = require('express')
const router = express.Router()
const multer = require('../helpers/multer-config')
const auth = require('../helpers/authorization')
const postController = require('../controllers/postController')

router.get('/', auth, postController.getAllUsersPosts)
router.post('/', auth, multer, postController.createUserPost)
router.get('/:id', auth, postController.getOnePost)
// router.put("/:id", auth, multer, postController.modifyPost);
router.post('/:id/post-view', auth, postController.viewPost)
router.post('/:id/give-like', auth, postController.givePostLike)
router.post('/:id/take-like', auth, postController.takePostLike)
router.get('/:id/postlikes', auth, postController.getAllPostLike)
router.delete('/:id', auth, postController.deletePost)

module.exports = router
