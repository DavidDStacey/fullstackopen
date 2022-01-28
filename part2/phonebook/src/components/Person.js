import React from 'react'

const Person = ({ persons }) => {
  return (
    <li>{persons.name}: {persons.number}</li>
  )
}

export default Person