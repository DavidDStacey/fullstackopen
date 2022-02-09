/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  // need a pasword
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

// connection
const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@phonebook.whr5s.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  // display all entries in ponebook
  console.log('Phonebook: ')
  //finds all entries
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name + ' ' + person.number)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  // add to phonebook
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(result => {
    console.log(`Added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  // incorrect args
  console.log('Incorrect args')
}