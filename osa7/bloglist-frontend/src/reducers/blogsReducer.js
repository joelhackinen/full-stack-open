import { createSlice } from '@reduxjs/toolkit'
import { setErrorMessage, setSuccessMessage } from './notificationReducer'
import blogService from '../services/blogService'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    editBlog(state, action) {
      const id = action.payload.id
      return state.map(b => b.id === id ? b = { ...b, likes: action.payload.likes } : b)
    },
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      return state.filter(b => b.id !== action.payload)
    }
  }
})

export const { editBlog, setBlogs, appendBlog, removeBlog } = blogSlice.actions

export const createBlog = (blogObject) => {
  return async dispatch => {
    try {
      const created = await blogService.create({ ...blogObject, likes: 0 })
      dispatch(appendBlog({ ...created, user: blogObject.user }))
      dispatch(setSuccessMessage(`a new blog ${blogObject.title} by ${blogObject.author} created`, 5))
    } catch (e) {
      dispatch(setErrorMessage(`adding failed: ${e.response.data.error}`, 5))
    }
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addLike = (blogObject) => {
  return async dispatch => {
    try {
      const { id, user, ...blog } = blogObject
      const likedBlog = await blogService.update(id, { ...blog, likes: blog.likes + 1 })
      dispatch(editBlog(likedBlog))
    } catch (e) {
      dispatch(setErrorMessage(`liking failed ${e.response.data.error}`, 5))
    }
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    try {
      await blogService.remove(id)
      dispatch(removeBlog(id))
      dispatch(setSuccessMessage('blog removed', 5))
    } catch (e) {
      dispatch(setErrorMessage(`removing failed ${e.response.data.error}`, 5))
    }
  }
}

export default blogSlice.reducer