// Fast, minimalist web framework
const express = require('express')
// Forwarding the supported requests
const router = express.Router()

// Authorization helper
const auth = require('../helpers/authorization')

// Let's import our controllers - the functions going to be directed
const userController = require('../controllers/userController')

/** Basic logic is:
 * Creating a route for a method:
 * from this end (/signup)
 * checking for authorization token, then
 * closing at the end with the function controller
 * attached with the containing function (userController.signup) **/
router.post('/signup', userController.signUpUser)
router.post('/login', userController.logInUser)
router.get('/', auth, userController.loadAllUsers)
router.delete('/:userid', auth, userController.deleteUser)

module.exports = router
