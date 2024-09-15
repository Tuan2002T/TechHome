import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Authentication from '../../screens/authentication'
import SignIn from '../../screens/authentication/SignIn'
import SignUp from '../../screens/authentication/SignUp'
import ActiveAccount from '../../screens/authentication/SignUp/ActiveAccount'
import NewPassword from '../../screens/authentication/SignIn/Password/NewPassword'
import ForgotPassword from '../../screens/authentication/SignIn/Password/ForgotPassword'
import Tabs from '../Tab'

const Stack = createStackNavigator()

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
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default function Stacks() {
  return (
    <NavigationContainer>
      <TabScreens />
    </NavigationContainer>
  )
}
