import reducer from './reducer'
import { useSelector, useDispatch } from 'react-redux'


const App = () => {
  const dispatch = useDispatch()
  const points = useSelector(state => state)
  const good = () => {
    dispatch(reducer(
      { type: 'GOOD' }
    ))
  }
  const ok = () => {
    dispatch(reducer(
      { type: 'OK' }
    ))
  }
  const bad = () => {
    dispatch(reducer(
      { type: 'BAD' }
    ))
  }
  const zero = () => {
    dispatch(reducer(
      { type: 'ZERO' }
    ))
  }

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <div>good {points.good}</div>
      <div>ok {points.ok}</div>
      <div>bad {points.bad}</div>
    </div>
  )
}

export default App