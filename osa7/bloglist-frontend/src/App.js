import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUser, logout } from './reducers/userReducer'
import Blogs from './components/Blogs'
import Message from './components/Message'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  return (
    <div>
      {user === null
        ?
        <div>
          <Message />
          <LoginForm />
        </div>
        :
        <div>
          <h2>blogapp</h2>
          <Message />
          {user.name} logged in
          <button id="logout-button" onClick={() => dispatch(logout())}>Logout</button>
          <BlogForm />
          <Blogs />
        </div>
      }
    </div>
  )
}

export default App