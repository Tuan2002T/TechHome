import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slice/userSlice'
import { apartmentDetailsReducer } from './Slice/apartmentDetailsSlice'

// Import redux-persist và AsyncStorage
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers } from 'redux'

// Cấu hình persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'apartmentDetails']
}

// Combine reducers
const rootReducer = combineReducers({
  auth: userReducer,
  apartmentDetails: apartmentDetailsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
})

export const persistor = persistStore(store)
export default store
