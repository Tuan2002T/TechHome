import { configureStore } from '@reduxjs/toolkit'
import userReduder from './Slice/userSlice'
import { apartmentDetailsReducer } from './Slice/apartmentDetailsSlice'

const store = configureStore({
  reducer: {
    auth: userReduder,
    apartmentDetails: apartmentDetailsReducer
  }
})

export default store
