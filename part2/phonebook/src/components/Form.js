import React from 'react'

const Form = ({ addPerson, newName, handleNameChange, newNumber, HandlenumberChange }) => {
  return (
    <>
    <h2>Add</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          Phone: <input value={newNumber} onChange={HandlenumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default Form