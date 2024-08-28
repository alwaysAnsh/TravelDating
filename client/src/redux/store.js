import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../redux/authSlice.js'
// import tripsReducer from './tripsSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    // trips: tripsReducer
  },
})