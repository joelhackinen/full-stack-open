import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import ShowCountries from './components/ShowCountries'

const App = () => {
  const [name, setName] = useState('')
  const [clicked, setClick] = useState(false)
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        setAllCountries(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    if (clicked) {
      setCountries(allCountries)
      setClick(false)
    }
    setName(event.target.value)
  }

  const handleClick = (country) => {
    setClick(true)
    setCountries([country])
  }
  //sdsadas

  const countriesToShow = countries.filter(c => c.name.common.toLowerCase().includes(name.toLowerCase()))

  return (
    <div>
      <div>
        <Filter filter={name} filterHandler={handleNameChange} />
      </div>
      <div>
        <ShowCountries countries={countriesToShow} clickHandler={handleClick} />
      </div>
    </div>
  )
}

export default App;
