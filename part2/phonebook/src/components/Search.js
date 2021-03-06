import React from 'react'
import Person from './Person'

const Search = ({ search, persons, deleteClick }) => {
    const showPerson = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())) 

    return (
        <>
        {showPerson.map(persons => 
            <Person 
            key={persons.id} 
            persons={persons}
            deleteClick={deleteClick} />        
            )}
        </> 
    )
}

export default Search