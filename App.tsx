import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './src/screens/Home'
import SignUp from './src/screens/authentication/SignUp'
import Authentication from './src/screens/authentication'
import SignIn from './src/screens/authentication/SignIn'
import ActiveAccount from './src/screens/authentication/SignUp/ActiveAccount'
import NewPassword from './src/screens/authentication/SignIn/Password/NewPassword'
import ForgotPassword from './src/screens/authentication/SignIn/Password/ForgotPassword'

// Khởi tạo các navigator
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function TabScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Authentication"
        component={Authentication}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ActiveAccount"
        component={ActiveAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewPassword"
        component={NewPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyTabs"
        component={MyTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <TabScreens />
    </NavigationContainer>
  )
}
