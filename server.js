const express = require('express')
const morgan = require('morgan')
const movies = require('./movie-data.js')
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(helmet())

app.get('/movie', (req, res) => {
  res.json(movies)
})

const PORT = 8000

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})