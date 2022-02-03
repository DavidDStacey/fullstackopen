import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountriesList, setShowCountryList] = useState([])

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
    setSearch(event.target.value.toLowerCase())
    setShowCountryList(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const btnClick = (event) => {
    console.log('clicked')
    console.log(event.target.value)
    setSearch(event.target.value.toLowerCase())
    setShowCountryList(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
    console.log('done')
}

  return (
    <>
      Find Countries <input value={search} onChange={handleSearch}/>
      <br />  

      {console.log('List of countries')}
      {console.log(showCountriesList)}
      {console.log('Search string')}
      {console.log(search)}

      <Search
      showCountriesList={showCountriesList} 
      btnClick={btnClick}/>
    </>
  );
}

export default App;
