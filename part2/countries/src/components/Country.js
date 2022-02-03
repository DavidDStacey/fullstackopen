import React from 'react'

const Display = ({countries}) => {
    return (
        <>
        <h1>{countries.name.common}</h1>
        Capital: {countries.capital}
        <br />
        Population: {countries.population}            
        <h3>Languages</h3>
        <ul>
        {    
            Object.entries(countries.languages)
            .map(([key, value]) => 
            <li key={key}>{value}</li>)
        }
        </ul>
        <img src={countries.flags.png} alt={countries.flag}/>
        </>
    )
}

const Country = ({ countries, showCountriesList, btnClick }) => {    
    
    if (showCountriesList.length === 1) {
        return (
            <Display countries={countries} />
        )
    }
    else {
        return (
            <div>
            {countries.name.common}
            <button onClick={btnClick} 
            value={countries.name.common}>
            show
            </button>
            </div> 
        )
    }
}

export default Country