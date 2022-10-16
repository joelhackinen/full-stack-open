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

export const setNotification = (message) => {
  return async dispatch => {
    dispatch(show(message))
    setTimeout(() => {
      dispatch(hide())
    }, 5000)
  }
}

export default notificationSlice.reducer