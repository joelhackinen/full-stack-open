import Country from './Country'
import CountryInfo from './CountryInfo'

const ShowCountries = ({ countries }) => {
  if (countries.length == 1) {
    return (
      <CountryInfo country={countries[0]} />
    )
  } else if (countries.length <= 10) {
    return (
      <div>
        {countries.map(c => <Country key={c.name.official} name={c.name.common} />)}
      </div>
    )
  } else {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
}

export default ShowCountries