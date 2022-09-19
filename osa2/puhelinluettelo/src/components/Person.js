const Person = ({ person, deleter }) => {
    return (
      <div>
        {person.name} {person.number}
        <button onClick={() => deleter(person)}>Delete</button>
      </div>
    )
  }
  
  export default Person