import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogService'
import loginService from '../services/loginService'
import jwt_decode from 'jwt-decode'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export const initializeUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      user.id = jwt_decode(user.token).id
      dispatch(setUser(user))
    }
  }
}

export const login = (username, password) => {
  return async dispatch => {
    const loggedUser = await loginService.login({
      username, password,
    })
    blogService.setToken(loggedUser.token)
    loggedUser.id = jwt_decode(loggedUser.token).id
    window.localStorage.setItem(
      'loggedBloglistUser', JSON.stringify(loggedUser)
    )
    dispatch(setUser(loggedUser))
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken(null)
    dispatch(setUser(null))
  }
}


export default userSlice.reducer