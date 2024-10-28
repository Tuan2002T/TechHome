import { createSlice } from '@reduxjs/toolkit'
import handleAsyncThunk from '../Thunk/handleAsyncThunk'
import { residentApartmentInfo } from '../Thunk/userThunk'

const initialState = {
  apartmentDetails: [],
  status: 'idle',
  error: null
}

const apartmentDetailsSlice = createSlice({
  name: 'apartmentDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncThunk(builder, residentApartmentInfo, 'apartmentDetails')
  }
})

export const apartmentDetailsReducer = apartmentDetailsSlice.reducer
