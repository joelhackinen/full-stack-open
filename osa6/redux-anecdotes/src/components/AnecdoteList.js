import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
    setNotification(`you voted ${anecdote.content}`, dispatch)
  }

  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filterText = useSelector(state => state.filter)
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  const anecdotesToShow = sortedAnecdotes.filter(a => a.content.toLowerCase().includes(filterText.toLowerCase()))

  return (
    <div>
      {anecdotesToShow.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      )}
    </div>
  )
}

export default AnecdoteList