/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './App'
import messaging from '@react-native-firebase/messaging'
import { name as appName } from './app.json'

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Tin nhắn được xử lý khi ở nền!', remoteMessage)
})

AppRegistry.registerComponent(appName, () => App)
