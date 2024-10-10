import * as React from 'react'
import Stacks from './src/Navigation/Stack'
import { Provider } from 'react-redux'
import store from './src/redux/store'

export default function App() {
  return(
    <Provider store={store}>
      <Stacks />
    </Provider>
  )
}
