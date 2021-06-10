const express = require('express')
const router = express.Router()
const multer = require('../helpers/multer-config')
const auth = require('../helpers/authorization')
const postController = require('../controllers/postController')
// const postviewController = require("../controllers/postviewController");

router.get('/', auth, postController.getAllUsersPosts)
router.post('/', auth, multer, postController.createUserPost)
// router.get("/:id", auth, postController.getOnePost);
// router.put("/:id", auth, multer, postController.modifyPost);
// router.put("/:id/view-post", auth, postviewController.postViewed);
// router.delete("/:id", auth, postController.deletePost);

module.exports = router
