import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogService'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    editBlog(state, action) {
      const id = action.payload.id
      return state.map(a => a.id !== id ? a : action.payload)
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
    const created = await blogService.create({ ...blogObject, likes: 0 })
    dispatch(appendBlog({ ...created, user: blogObject.user }))
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addLike = (blogObject) => {
  const { id, ...blog } = blogObject
  return async dispatch => {
    const likedBlog = await blogService.update(
      id,
      blog
    )
    dispatch(editBlog(likedBlog))
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export default blogSlice.reducer