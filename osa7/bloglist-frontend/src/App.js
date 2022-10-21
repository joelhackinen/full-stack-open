import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setErrorMessage, setSuccessMessage } from './reducers/notificationReducer'
import { initializeBlogs, addLike, deleteBlog, createBlog } from './reducers/blogsReducer'
import { initializeUser, login, logout } from './reducers/userReducer'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import Message from './components/Message'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const createFormRef = useRef()

  const handleLogin = async (username, password) => {
    try {
      dispatch(login(username, password))
      dispatch(setSuccessMessage(`welcome, ${username}!`, 5))
    }
    catch (e) {
      dispatch(setErrorMessage('wrong username or password', 5))
    }
  }

  const handleLogout = () => {
    try {
      dispatch(logout())
      dispatch(setSuccessMessage('logged out', 5))
    }
    catch (e) {
      dispatch(setErrorMessage('loggin out failed', 5))
    }
  }

  const addBlog = async (blogObject) => {
    try {
      dispatch(createBlog({ ...blogObject, user }))
      createFormRef.current.toggleVisibility()
      dispatch(setSuccessMessage(`a new blog ${blogObject.title} by ${blogObject.author} created`, 5))
    }
    catch (e) {
      dispatch(setErrorMessage(`adding failed: ${e}`, 5))
    }
  }

  const editBlog = async (blogObject) => {
    try {
      dispatch(addLike(blogObject))
    } catch (e) {
      dispatch(setSuccessMessage('editing failed', 5))
    }
  }

  const removeBlog = async (blogObject) => {
    if (window.confirm(`Remove ${blogObject.title} by ${blogObject.author}?`)) {
      try {
        dispatch(deleteBlog(blogObject.id))
        dispatch(setSuccessMessage('blog removed', 5))
      }
      catch (e) {
        dispatch(setSuccessMessage(`error in removing: ${e}`, 5))
      }
    }
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  if (user === null) {
    return (
      <div>
        <Message />
        <LoginForm
          login={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogapp</h2>
      <Message />
      {user.name} logged in
      <button id="logout-button" onClick={handleLogout}>Logout</button>
      <Togglable showText='create' hideText='cancel' ref={createFormRef}>
        <BlogForm createBlog={addBlog} user={user} />
      </Togglable>
      <h3>blogs</h3>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={editBlog} deleteBlog={removeBlog} userId={user.id}/>
      )}
    </div>
  )
}

export default App