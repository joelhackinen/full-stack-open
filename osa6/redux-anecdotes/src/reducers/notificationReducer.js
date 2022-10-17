import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', show: false }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    show(state, action) {
      return {
        message: action.payload,
        show: true
      }
    },
    hide(state, action) {
      return {
        message: '',
        show: false
      }
    }
  }
})

export const { show, hide } = notificationSlice.actions

let timeout = null

export const setNotification = (message, seconds) => {
  return async dispatch => {
    if (timeout) {
      clearTimeout(timeout)
    }
    dispatch(show(message))
    timeout = setTimeout(() => {
      dispatch(hide())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer