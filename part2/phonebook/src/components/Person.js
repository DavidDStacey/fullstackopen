import React from 'react'

const Person = ({ persons, deleteClick }) => {
  return (
    <li className='personList'>
      {persons.name}: {persons.number}
      <button 
        onClick={deleteClick}
        id={persons.id}
        name={persons.name}>Delete</button>
    </li>
  )
}

export default Person