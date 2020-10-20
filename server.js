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

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('Authorization')

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }
  next()
})

app.get('/movie', (req, res) => {
  let response = movies;

  if(req.query.genre){
    response = response.filter(movie => 
      movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    )
  }

  if(req.query.country){
    response = response.filter(movie => 
      movie.country.toLowerCase().includes(req.query.country.toLowerCase())
    )
  }

  if(req.query.avg_vote){
    response = response.filter(movie =>
      movie.avg_vote >= req.query.avg_vote)
  }
  res.json(response)
})

const PORT = 8000

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})