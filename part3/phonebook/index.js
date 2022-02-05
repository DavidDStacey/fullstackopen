const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

app.use(cors())
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

let persons = 
[
    { 
      "id": "Arto Hellas",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "Ada Lovelace",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "Dan Abramov",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "Mary Poppendieck",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => 
{
    response.send('Hello World')
})

app.get('/api/persons/', (request, response) => 
{
    if (persons) {    
        response.json(persons) 
    } else {    
        response.status(404).end()  
    }
})

app.get('/info/', (request, response) => 
{
    response
    .send('Phonebook has info for ' 
    + persons.length + ' people <br/><br/>' + 
    new Date())
})

app.get('/api/persons/:id', (request, response) => 
{
    const id = request.body.id
    const person = persons.find(person => person.id === id)
    if(person)
    {
        response.json(person)
    } else {
        console.log('No person with id: ' + id)
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id =request.params.id
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

app.post('/api/persons/', (request, response) => {
    const person = {
        name: request.body.name,
        number: request.body.number,
        id: request.body.name
    }
    persons = persons.concat(person)
    response.json(person)
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })