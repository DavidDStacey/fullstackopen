const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

morgan.token('body', (req) => {
    const body = JSON.stringify(req.body)
    if (body === JSON.stringify({})) {
        return ''
    }
    else {
        return body
    }
})

//https://github.com/expressjs/morgan
app.use(morgan(':method :url :status :req[body] - :response-time ms :body'))

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

//app.use(requestLogger)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

let persons = 
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

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
    const id = Number(request.params.id)
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
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

const generateId = () => {
    let id = Math.floor(Math.random() * Math.floor(100000))
    return id
}

app.post('/api/persons/', (request, response) => {
    const person = {
        name: request.body.name,
        number: request.body.number,
        id: generateId()
    }
    
    if (person.name === '') {
        console.log('Name please')
        response.status(400).json({error: 'content missing'})
    } else if (person.number === '') {
        console.log('Number please')
        response.status(400).json({error: 'content missing'})
    } else if (persons.find(p => p.name === person.name)) {
        console.log('Name already here bro')
        response.status(400).json({error: 'Name already exist'})
    } else {
        console.log(person)
        response.json(person)
    }
})