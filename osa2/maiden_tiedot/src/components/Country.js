const Country = ({ country, handler }) => {
  return (
    <div>
      {country.name.common}
      <button onClick={() => handler(country)}>Show</button>
    </div>
  )
}


export default Country