import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Form from './components/Form'
import axios from 'axios'

const App = () => {
  // use db.json instead
  //const [persons, setPersons] = useState([
  //  { name: 'Arto Hellas', number: '040-123456', id: 1 },
  //  { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  //  { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  //  { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  //])
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    if (newName === '' || newNumber === '') {
      console.log('Cannot be empty')
      window.alert('Form cannot be empty')
    }
    else if(persons.filter(person => person.name === newName).length === 0) {
      if(persons.filter(person => person.number === newNumber).length === 0) {
        console.log('New person added')
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
      }
      else{
        console.log('Number already exist')
        window.alert('Phone number: ' + newNumber + ' is already in numberbook')
        setNewName('')
        setNewNumber('')
      }
    }
    else {
      console.log('Person already exist')
      window.alert(newName + ' is already in numberbook')
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const HandlenumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    console.log()
  }

  return (
    <div>
      <h2>Phonebook</h2>
      Filter Names: <input value={search} onChange={handleSearchChange}/>
      <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} HandlenumberChange={HandlenumberChange}/>
      <h2>Numbers</h2>
      <ul>        
        <Search search={search} persons={persons}/>   
      </ul>
    </div>
  )
}

export default App
