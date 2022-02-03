import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState([])
    
    useEffect(() => {
        console.log('effect')
        axios
          .get('http://api.weatherapi.com/v1/current.json?key='+api_key+'&q='+capital)
          .then(response => {
            console.log('promise fulfilled')
            setWeather([response.data])
          }).catch(error => {
              console.log(error);
          })
      }, [])

    if(weather.length > 0) {
        return (
            <>
            Temperature: {weather[0].current.temp_f} F
            <br/>
            <img src={weather[0].current.condition.icon} alt='Weather Icon'/>
            <br/>
            Wind: {weather[0].current.wind_mph} mph {weather[0].current.wind_dir}
            </>
        )
    }
    return (
        <>
        {console.log('weather is less than 0')}
        {console.log('Loading...')}
        </>
    )
}

export default Weather