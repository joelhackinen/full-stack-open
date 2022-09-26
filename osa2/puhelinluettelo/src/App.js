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
  const [message, setMessageText] = useState('')
  const [messageColor, setMessageColor] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const showMessage = (text, err) => {
    setMessageText(text)
    setMessageColor(err ? 'red' : 'green')
    setTimeout(() => {
      setMessageText('')
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(p => p.number).includes(newNumber)) {
      showMessage(`${newNumber} is already added to phonebook`, true)
    } else if (persons.map(p => p.name).includes(newName)) {
      if (window.confirm(`${newName} is already added, replace the old number with the new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber }
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
            showMessage(`Updated number for ${newName}`, false)
          })
          .catch(error => {
            setPersons(persons.filter(p => p.id !== person.id))
            showMessage(`${newName} has already been removed from the server`, true)
          })
      }
    } else {
      const personObj = { name: newName, number: newNumber }
      personService
        .create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          showMessage(`Added ${newName}`, false)
        })
        .catch(error => {
          showMessage(`${error.response.data}`, true)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(r => {
          setPersons(persons.filter(p => p.id !== person.id))
          showMessage(`Deleted ${person.name}`, false)
        })
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

  const personsToShow = persons.filter(p => String(p.name).toLowerCase().includes(newFilter.toLowerCase()))

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
