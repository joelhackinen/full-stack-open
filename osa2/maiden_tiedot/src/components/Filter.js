const Filter = ({ filter, filterHandler}) => {
  return (
    <p>find countries <input value={filter} onChange={filterHandler} /></p>
  )
}

export default Filter