import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const createReduxStore = () => {
  return (
    configureStore({
      reducer: {
        anecdotes: anecdoteReducer,
        notification: notificationReducer
      }
    })
  )
}

export default createReduxStore