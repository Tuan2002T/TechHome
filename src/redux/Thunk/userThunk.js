import { createAsyncThunk } from '@reduxjs/toolkit';
import { activeResident, loginResident } from '../../api/API/user';

export const login = createAsyncThunk(
  'user/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await loginResident(loginData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  } 
);
export const activateUserThunk = createAsyncThunk(
  'user/active',
  async (userId, { rejectWithValue }) => {
    try {
      const activeUser = await activeResident(userId);
      return activeUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);