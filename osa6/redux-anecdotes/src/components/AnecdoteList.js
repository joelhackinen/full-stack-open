import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote }) => {
  const { content, votes } = anecdote
  const dispatch = useDispatch()

  const vote = (anecdoteObject) => {
    dispatch(addVote(anecdoteObject))
    dispatch(setNotification(`you voted ${content}`, 5))
  }

  return (
    <div>
      <div>
        {content}
      </div>
      <div>
        has {votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  )
}


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filterText = useSelector(state => state.filter)
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  const anecdotesToShow = sortedAnecdotes.filter(a => a.content.toString().toLowerCase().includes(filterText.toLowerCase()))

  return (
    <div>
      {anecdotesToShow.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      )}
    </div>
  )
}

export default AnecdoteList