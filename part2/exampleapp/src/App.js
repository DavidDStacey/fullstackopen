import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  
  useEffect(() => {
    noteService      
      .getAll()      
      .then(intitalNotes => {        
        setNotes(intitalNotes)      
      })  
  }, [])

  const toggleImportanceOf = (id) => {
    const url = 'http://localhost:3001/notes/' + id
    const note = notes.find(n => n.id === id)
    /// ...note creates new obj with copies 
    // of all properties from the note obj
    // important: !note.important
    // makes importance opposite of what it was
    const changedNote = { ...note, important: !note.important}

    noteService      
      .update(id, changedNote)      
      .then(returnedNote  => {        
        setNotes(notes.map(note => 
          note.id !== id ? note 
          : returnedNote))      
      })
  }

  // result = condition ? val1 : val2
  // result = val1 if conition is true
  // result = val2 if consition is false
  // notesToShow will show all if showAll is true
  // will show only important if showAll is false
  const notesToShow = showAll 
    ? notes 
    : notes.filter(note => note.important)
  
  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    noteService      
      .create(noteObject)      
      .then(returnedNote => {        
        setNotes(notes.concat(returnedNote))        
        setNewNote('')      
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>        
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }        
        </button>      
      </div>
      <ul>        
        {notesToShow.map(note => 
          <Note key={note.id} 
          note={note}
          toggleImportance={() => 
            toggleImportanceOf(note.id)} 
          />        
        )}     
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote}
        onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App