import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'



function App() {

  const [inputValue, setInputValue] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

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
    

  const inputChange = (event) => {
    console.log(event.target.value)
    setInputValue(event.target.value)
  }

  const getLanguages = (languages) => {
    if(Array.isArray(languages)){
      return languages.map(lang => (
        <li key={lang}>
          {lang}
        </li>
      ))
    } else if(typeof languages === "object"){
      return Object.values(languages).map(lang => (
        <li key={lang}>
          {lang}
        </li>
      ))
    } else {
      return 'unknown'
    }
  }

  const handleDisplayCountry = (country) => setSelectedCountry(country)

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
              <li className='ul' key={country.name.common}>
                {country.name.common}
                <button onClick={() => handleDisplayCountry(country)}>show</button>
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

      {selectedCountry && (
        <div>
          <h3>Country: {selectedCountry.name.common}</h3>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Area: {selectedCountry.area}</p>
          <h4>Language(s): </h4>
          <ul>{getLanguages(selectedCountry.languages)}</ul>
          <p>Flag: </p>
          <img 
            src={selectedCountry.flags.png}
            alt={selectedCountry.name.common+' Flage'}
          />
        </div>
      )}

      
    
    </div>
  )
}

export default App
