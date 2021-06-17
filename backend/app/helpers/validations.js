// Secret or Private Key (Token) generator for verification purpose
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)
const hashPassword = password => bcrypt.hashSync(password, salt)

const comparePassword = (hashedPassword, password) => {
  return bcrypt.compareSync(password, hashedPassword)
}

const isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/
  return regEx.test(email)
}

const validatePassword = (password) => {
  if (password.length <= 5 || password === '') {
    return false
  } return true
}

const isEmpty = (input) => {
  if (input === undefined || input === '') {
    return true
  }
  if (input.replace(/\s/g, '').length) {
    return false
  } return true
}

const empty = (input) => {
  if (input === undefined || input === '') {
    return true
  }
}

const generateUserToken = (email, userid, firstname, lastname) => {
  const token = jwt.sign({
    email: email,
    userid: userid,
    firstname: firstname,
    lastname: lastname
  },
  process.env.SECRET, { expiresIn: '3d' })
  return token
}

module.exports = { hashPassword, comparePassword, isValidEmail, validatePassword, isEmpty, empty, generateUserToken }
