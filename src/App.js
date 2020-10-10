import React, {useState, useEffect} from 'react'
import {FormControl, Select, MenuItem} from '@material-ui/core'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')

  useEffect(() => {
    const getCountriesDate = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(resp => resp.json())
        .then(result => {
          const countries = result.map(country => ({
            name: country.country,
            value: country.countryInfo.iso3,
          }))

          setCountries(countries)
        })
    }

    getCountriesDate()
  }, [])

  //select counrty from dropdown
  const onCountryChange = async e => {
    const counrtyCode = e.target.value
    setCountry(counrtyCode)
    await fetch(`https://disease.sh/v3/covid-19/countries/${counrtyCode}`)
      .then(resp => resp.json())
      .then(result => console.log(result))
  }

  return (
    <div className='app'>
      <div className='app__header'>
        <h1>COVID-19 TRACKER</h1>
        <FormControl className='app__dropdown'>
          <Select variant='outlined' value={country} onChange={onCountryChange}>
            <MenuItem value='worldwide'>WorldWide</MenuItem>
            {countries.map(country => (
              <MenuItem key={country.name} value={country.value}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  )
}

export default App
