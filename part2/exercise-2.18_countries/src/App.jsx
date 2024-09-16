import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const [inputValue, setInputValue] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('countries', countries)
    if(inputValue){
      axios
        .get(`https://restcountries.com/v3.1/name/${inputValue}`)
        .then(response => {
          setCountries(response.data)
        })
        console.log(countries)
    }    
  },[inputValue])
    
  const onSearch = (event) => {
    event.preventDefault()
    setSearchCountry(inputValue)
    
  }

  const inputChange = (event) => {
    console.log(event.target.value)
    setInputValue(event.target.value)
  }

  const getLanguages = (languages) => {
    if(Array.isArray(languages)){
      return languages.map(lang => (
        <li>
          {lang}
        </li>
      ))
    } else if(typeof languages === "object"){
      return Object.values(languages).map(lang => (
        <li>
          {lang}
        </li>
      ))
    } else {
      return 'unknown'
    }
  }

  return (
    <div>
      <h3>Country searching application</h3>
      <label>
        Find countries: <input value={inputValue} onChange={inputChange}/>
      </label>
      {countries.length > 10 && (
        <p>Too many countries, please make your query more specific</p>
      )}

      {countries.length <= 10 && countries.length > 1 && (
        <div>
          <h4>Matching Countries: </h4>
          <ul>
            {countries.map(country => (
              <li key={country.name.common}>
                {country.name.common}
              </li>
            ))}
          </ul>
        </div>
      )}

      {countries.length == 1 && (
        <div>
          <h3>Country: {countries[0].name.common}</h3>
          <p>Capital: {countries[0].capital}</p>
          <p>Area: {countries[0].area}</p>
          <h4>Language(s): </h4>
          <ul>{getLanguages(countries[0].languages)}</ul>
          <p>Flag: </p>
          <img 
            src={countries[0].flags.png}
            alt={countries[0].name.common+' Flage'}
          />
        </div>
      )}
    
    </div>
  )
}

export default App
