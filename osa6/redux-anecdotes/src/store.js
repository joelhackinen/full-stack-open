import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const createReduxStore = () => {
  return (
    configureStore({
      reducer: {
        anecdotes: anecdoteReducer,
        notification: notificationReducer,
        filter: filterReducer
      }
    })
  )
}

export default createReduxStore