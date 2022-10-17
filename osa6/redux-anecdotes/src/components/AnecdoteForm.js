import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


const AnecdoteForm = ({ createAnecdote, setNotification }) => {

  const add = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdote(content)
    setNotification(`${content} created`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <input name="anecdote" /> 
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default connect(null, { createAnecdote, setNotification })(AnecdoteForm)