import React from 'react'
import Weather from './Weather'

const Country = ({ countries, showCountriesList, btnClick }) => {    
    
    if (showCountriesList.length === 1) {
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
            <h3>Weather in {countries.capital}</h3>
            <Weather capital={countries.capital} country={countries.name.common}/>
            </> 
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