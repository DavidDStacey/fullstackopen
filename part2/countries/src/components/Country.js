import React from 'react'

const Country = ({ countries }) => {

    return (
        <li>{countries.name.common}: {countries.name.common}</li>
    )
}

export default Country