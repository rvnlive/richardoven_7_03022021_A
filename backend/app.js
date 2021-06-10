const express = require('express')
const app = express()
const path = require('path')
const helmet = require('helmet')
require('dotenv').config()
/** Cross Origin for backend + frontend connection */
const cors = require('cors')

const userRoutes = require('./app/routes/userRoutes')
const postRoutes = require('./app/routes/postRoutes')

/** Postgres + Sequelize Connection */
const database = require('./app/config/database.config')
database.authenticate()
  .then(() => {
    console.log('Database connection Live!')
  })

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/auth', userRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

module.exports = app
