import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/personService'
import Message from './components/Message'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState('')
  const [messageColor, setMessageColor] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(p => p.number).includes(newNumber)) {
      setMessage(`${newNumber} is already added to phonebook`)
      setMessageColor('red')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    } else if (persons.map(p => p.name).includes(newName)) {
      if (window.confirm(`${newName} is already added, replace the old number with the new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber }
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id != returnedPerson.id ? p : returnedPerson))
            setMessage(`Updated number for ${newName}`)
            setMessageColor('green')
          })
          .catch(error => {
            setPersons(persons.filter(p => p.id != person.id))
            setMessage(`${newName} has already been removed from the server`)
            setMessageColor('red')
          })
        setTimeout(() => {
          setMessage('')
        }, 5000)
      }
    } else {
      const personObj = { name: newName, number: newNumber }
      personService
        .create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added ${newName}`)
          setMessageColor('green')
          setTimeout(() => {
            setMessage('')
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(setPersons(persons.filter(p => p.id != person.id)))
      setMessage(`Deleted ${person.name}`)
      setMessageColor('green')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Message msg={message} colour={messageColor} />
      <Filter filter={newFilter} handler={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm name={newName} nameHandler={handleNameChange} number={newNumber} numberHandler={handleNumberChange} adder={addPerson} />
      <h3>numbers</h3>
      <Persons persons={personsToShow} deleteHandler={deletePerson}/>
    </div>
  )
}

export default App
