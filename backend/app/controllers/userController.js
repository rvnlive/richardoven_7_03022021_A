/** Lets import our helpers (middleware) first **/
/* For status feedback */
const {
  errorMessage, successMessage, status
} = require('../helpers/status')
/* For validation and security purposes */
const {
  hashPassword,
  comparePassword,
  isValidEmail,
  validatePassword,
  isEmpty,
  generateUserToken
} = require('../helpers/validations')

const initModels = require('../models/init-models').initModels
const sequelize = require('../config/database.config')
console.log(initModels)
const models = initModels(sequelize)
const User = models.users

/// /////////////////////////////////////////// //

exports.signUpUser = (req, res) => {
  const { firstName, lastName, email, password } = req.body
  // Validating our database entries
  // It is being validated first at FrontEnd, but you can never be sure.
  if (isEmpty(firstName) || isEmpty(lastName) || isEmpty(email) || isEmpty(password)) {
    errorMessage.error = 'Fields can NOT be empty'
    console.log(errorMessage.error)
    return res.status(status.bad).send(errorMessage)
  }
  if (!isValidEmail(email)) {
    errorMessage.error = 'Please enter a valid Email'
    return res.status(status.bad).send(errorMessage)
  }
  if (!validatePassword(password)) {
    errorMessage.error = 'Password must be more than five(5) characters'
    return res.status(status.bad).send(errorMessage)
  }
  // Creating a hashed (securely stored) password
  const hashedPassword = hashPassword(password)
  /// ///////////////////////////////////////////////
  // Lets 'Find or Create' our User
  User
    .findOrCreate({
      where: { email: email },
      defaults: {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: hashedPassword
      }
    })
    // Find or Create results an array
    // [object, created (<- it is a boolean: if created: true / existing: false )]
    .then((result) => {
      const [user, created] = result
      console.log(user)
      if (created) {
        return res.json({ userCreated: created })
      } else {
        errorMessage.error = 'Existing user!'
        return res.status(status.conflict).send(errorMessage)
      }
    })
    .catch(error => console.log('Operation was not successful ' + error)
    )
}

exports.logInUser = (req, res) => {
  const { email, password } = req.body

  if (isEmpty(email) || isEmpty(password)) {
    errorMessage.error = 'Email or Password detail is missing'
    return res.status(status.bad).send(errorMessage)
  }
  if (!isValidEmail(email) || !validatePassword(password)) {
    errorMessage.error = 'Please enter a valid Email or Password'
    return res.status(status.bad).send(errorMessage)
  }
  /// ///////////////////////////////////////////////

  // FindOne results an array
  User
    .findOne({
      where: { email }
    })
    .then((result) => {
      // console.log(result)
      if (result === null) {
        errorMessage.error = 'User with this email does not exist'
        return res.status(status.notfound).send(errorMessage)
      }
      if (!comparePassword(result.password, password)) {
        errorMessage.error = 'The password provided is incorrect'
        return res.status(status.bad).send(errorMessage)
      }
      const token = generateUserToken(result.email, result.userId, result.firstName, result.lastName)
      delete result.password
      successMessage.data = result
      successMessage.data.token = token
      return res.json({ userid: result.userid, firstname: result.firstname, lastname: result.lastname, token: token })
    })
    .catch(error => console.log('Operation was not successful ' + error))
}

/**
 LIST ALL USERS
**/
exports.loadAllUsers = (req, res) => {
  User
    .findAll({
      attributes: { exclude: ['password', 'email', 'updatedat'] }
    })
    .then(users => {
      return res.json(users)
    })
    .catch(error => console.log('Operation was not successful ' + error))
}

/**
 DELETE A USER
**/
exports.deleteUser = (req, res) => {
  User
    .destroy({
      where: { userid: req.params.userid }
    })
    .then(result => {
      result = 'User has been deleted'
      return res.json(result)
    })
    .catch(error => console.log('Operation was not successful ' + error))
}
