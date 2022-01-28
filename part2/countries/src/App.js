import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'

function App() {
  const [search, setSearch] = useState([])
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <>
      Find Countries <input value={search} onChange={handleSearch}/>
      <ul>        
        <Search search={search} countries={countries}/>   
      </ul>
    </>
  );
}

export default App;
