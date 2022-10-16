import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`${content} created`))
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

export default AnecdoteForm