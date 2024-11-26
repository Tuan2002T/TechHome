import { createSlice } from '@reduxjs/toolkit'
import handleAsyncThunk from '../Thunk/handleAsyncThunk'
import { login } from '../Thunk/userThunk'

const initialState = {
  userData: null,
  posts: [],
  otherData: null,
  rememberMe: false,
  status: 'idle',
  error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRememberMe(state, action) {
      state.rememberMe = action.payload
    },
    setUserData(state, action) {
      state.userData = action.payload
    }
  },
  extraReducers: (builder) => {
    handleAsyncThunk(builder, login, 'userData')
  }
})

export const { setRememberMe, setUserData } = userSlice.actions

export default userSlice.reducer
