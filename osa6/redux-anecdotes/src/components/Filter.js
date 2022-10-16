import { change } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'


const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    dispatch(change(event.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange}></input>
    </div>
  )
}

export default Filter