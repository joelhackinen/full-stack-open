const Filter = ({ filter, handler }) => {
  return (
    <div>
      <p>filter shown with <input value={filter} onChange={handler} /></p>
    </div>
  )
}

export default Filter