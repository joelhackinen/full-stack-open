import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const { reset: resetUsername, ...username } = useField('username', 'text')
  const { reset: resetPassword, ...password } = useField('password', 'password')

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login(
      username.value,
      password.value)
    )
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input { ...username } />
        </div>
        <div>
          password
          <input { ...password } />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}


export default LoginForm