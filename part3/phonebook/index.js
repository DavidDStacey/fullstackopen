const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
const PORT = process.env.PORT

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ].join(' ')
}))

const Person = require('./models/person')

app.get('/', (req, res) => {
  res.send('Phonebook Backend')
})

app.get('/api/persons', (request, response) => 
{
  Person.find({}).then(persons=>{
    response.json(persons)
  })
})

app.get('/info', (request, response) => 
{
  Person.find({}).then(results => {
    response.send(`Phonebook has info for ${results.length} people` + "\n" + new Date())
  })
})

app.get('/api/persons/:id', (request, response) => 
{
  Person.findById(request.body.id)
  .then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  if (!request.body.name || !request.body.number) {
    return response.status(400).json({
        error: 'content missing'
    })
  }

  const person = new Person({
    name: request.body.name,
    number: request.body.number,
    //id: request.body.name
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const person = {
      name: request.body.name,
      number: request.body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })