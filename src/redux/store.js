import { configureStore } from '@reduxjs/toolkit'
import userReduder from './Slice/userSlice'

const store = configureStore({
  reducer: {
    auth: userReduder
  }
})

export default store
