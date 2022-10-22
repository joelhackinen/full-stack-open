import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { Routes, Route, useMatch } from 'react-router-dom'
import Home from './components/Home'
import Menu from './components/Menu'
import Message from './components/Message'
import LoginForm from './components/LoginForm'
import User from './components/User'
import Users from './components/Users'
import BlogPage from './components/BlogPage'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const userMatch = useMatch('/users/:id')
  const matchedUser = userMatch
    ? users.find(u => u.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const matchedBlog = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null

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
          <Menu />
          <h2>blogapp</h2>
          <Message />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/users' element={<Users />} />
            <Route path='/users/:id' element={<User user={matchedUser} />} />
            <Route path='/blogs/:id' element={<BlogPage blog={matchedBlog} />} />
          </Routes>
        </div>
      }
    </div>
  )
}

export default App