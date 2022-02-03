import React from 'react'
import Country from './Country'


const Search = ({ showCountriesList, btnClick }) => {

    if(showCountriesList.length < 10) {
        return (
            <>
            {showCountriesList.map(countries => 
                <Country 
                key={countries.name.common} 
                countries={countries} 
                showCountriesList={showCountriesList}
                btnClick={btnClick}/>
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