import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Form from './components/Form'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber,
      id: newName,
    }

    if (newName === '' || newNumber === '') {
      console.log('Cannot be empty')
      window.alert('Form cannot be empty')
    } else if (newName.length !== 3) {
      console.log('Name must be at least 3 characters')
      window.alert('Name must be at least 3 characters')
    } else if (newNumber.length !== 10) {
      console.log('Number must be 10 characters')
      window.alert('Number must be 10 characters')
    } else if(persons.filter(person => person.name === newName).length === 0) {
      if(persons.filter(person => person.number === newNumber).length === 0) {
        console.log('New person added')
        
        personsService
          .create(personObject)
            .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
          })
        setNewName('')
        setNewNumber('')
      } else{
        console.log(`Number ${newNumber} already exist`)
        setNewName('')
        setNewNumber('')
      }
    } else {
      if(window.confirm(newName + ' is in phonebook, replace old number with new?')) {
        const id = persons.filter(person => person.name === newName)[0].id
        const personsFound = persons.find(n => n.id === id)
        const changedPersons = { ...personsFound, number: personObject.number}
        
        personsService
          .update(id, changedPersons)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
        })
      } 
    }
      setNewName('')
      setNewNumber('')
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

  const deleteClick = (event) => {
    console.log('Deleting now ...')
    console.log('Target id is: ' + event.target.id)
    console.log('Target name is: ' + event.target.name)
    if (window.confirm(`Delete ${event.target.name} ?`)) {
      personsService
        .deletePerson(event.target.id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== event.target.id))
      })
    }
    setSearch('')
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      Filter Names: <input value={search} onChange={handleSearchChange}/>
      <Form 
        addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        HandlenumberChange={HandlenumberChange}
      />
      <h2>Numbers</h2>
      <ul>        
        <Search 
          search={search} 
          persons={persons}
          deleteClick={deleteClick}
        />   
      </ul>
    </div>
  )
}

export default App
