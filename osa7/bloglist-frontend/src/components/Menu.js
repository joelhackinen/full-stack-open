import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'

const Menu = () => {
  const { name } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const padding = {
    paddingRight: 5
  }
  const style = {
    backgroundColor: 'grey'
  }
  return (
    <div style={style}>
      <Link style={padding} to='/'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
      {name} logged in
      <button id="logout-button" onClick={() => dispatch(logout())}>Logout</button>
    </div>
  )
}

export default Menu