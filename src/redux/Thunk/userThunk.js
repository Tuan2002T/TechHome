import { createAsyncThunk } from '@reduxjs/toolkit'
import { activeResident, loginResident } from '../../api/API/user'
import { getResidentApartmentInfo } from '../../api/API/info '

export const login = createAsyncThunk(
  'user/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await loginResident(loginData)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const activateUserThunk = createAsyncThunk(
  'user/active',
  async (userId, { rejectWithValue }) => {
    try {
      const activeUser = await activeResident(userId)
      return activeUser
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const residentApartmentInfo = createAsyncThunk(
  'user/apartmentInfo',
  async (token, { rejectWithValue }) => {
    try {
      const response = await getResidentApartmentInfo(token)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
