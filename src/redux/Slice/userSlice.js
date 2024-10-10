import { createSlice } from '@reduxjs/toolkit'
import handleAsyncThunk from '../Thunk/handleAsyncThunk'
import { login } from '../Thunk/userThunk'

const initialState = {
  userData: null,
  posts: [],
  otherData: null,
  status: 'idle',
  error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncThunk(builder, login, 'userData')
  }
})

export default userSlice.reducer
