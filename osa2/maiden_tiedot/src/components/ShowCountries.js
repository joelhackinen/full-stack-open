import Country from './Country'
import CountryInfo from './CountryInfo'

const ShowCountries = ({ countries, clickHandler }) => {
  if (countries.length == 1) {
    return (
      <CountryInfo country={countries[0]} />
    )
  } else if (countries.length <= 10) {
    return (
      <div>
        {countries.map(c => <Country key={c.name.official} country={c} handler={clickHandler}/>)}
      </div>
    )
  } else {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
}

export default ShowCountries