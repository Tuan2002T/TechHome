import * as React from 'react'
import Stacks from './src/Navigation/Stack'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import './src/i18n/i18n';
export default function App() {
  return(
    <Provider store={store}>
      <Stacks />
    </Provider>
  )
}
