import * as React from 'react'
import Stacks from './src/Navigation/Stack'
import { Provider } from 'react-redux'
import store, { persistor } from './src/redux/store'
import './src/i18n/i18n'
import { PersistGate } from 'redux-persist/integration/react'
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stacks />
      </PersistGate>
    </Provider>
  )
}
