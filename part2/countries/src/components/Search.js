import React from 'react'
import Country from './Country'

const Search = ({ search, countries }) => {
    const showCountries = countries.filter(country => country.name.common.toLowerCase().includes(search))
    console.log(showCountries)

    if(showCountries.length < 10) {
        return (
            <>
            {showCountries.map(countries => 
                <Country key={countries.name.common} countries={countries} />        
                )}
            </> 
        )
    }
    else {
        return (
            <>Too Many To Show</>
        )
    }
    
}

export default Search