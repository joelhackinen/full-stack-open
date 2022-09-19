import Person from './Person'

const Persons = ({ persons, deleteHandler }) => {
  return (
    <div>
      {persons.map(p => <Person key={p.name} person={p} deleter={deleteHandler}/> )}
    </div>
  )
}

export default Persons