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
      state = action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export const initializeUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    user.id = jwt_decode(user.token).id
    setUser(user)
    console.log(user)
  }
}

/*
export const login = async (username, password) => {
  try {
    const loggedUser = await loginService.login({
      username, password,
    })
    blogService.setToken(loggedUser.token)
    loggedUser.id = jwt_decode(loggedUser.token).id
    window.localStorage.setItem(
      'loggedBloglistUser', JSON.stringify(loggedUser)
    )
    showMessage(`welcome, ${username}!`, false)
    setUser(loggedUser)
  }
  catch (e) {
    showMessage('wrong username or password', true)
  }
}
*/

export default userSlice.reducer