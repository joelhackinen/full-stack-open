import { change } from '../reducers/filterReducer'
import { connect } from 'react-redux'


const Filter = ({ change }) => {
  
  const handleChange = (event) => {
    change(event.target.value)
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

export default connect(null, { change })(Filter)