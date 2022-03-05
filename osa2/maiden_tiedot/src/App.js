import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import ShowCountries from './components/ShowCountries'

const App = () => {
  const [name, setName] = useState('')
  const [countries, setCountries] = useState([])
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const countriesToShow = countries.filter(c => c.name.common.toLowerCase().includes(name.toLowerCase()))

  return (
    <div>
      <div>
        <Filter filter={name} filterHandler={handleNameChange} />
      </div>
      <div>
        <ShowCountries countries={countriesToShow} />
      </div>
    </div>
  )
}

export default App;
