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
import Notification from '../../screens/App/Notification'
import ApartmentDetails from '../../screens/App/ApartmentDetails'
import BookService from '../../screens/App/Service/BookServide'
import Feedback from '../../screens/App/Feedback'
import ChatMessage from '../../screens/App/ChatMessage'
import { socket } from '../../Socket/socket'
import EditProfile from '../../screens/App/Profile/EditProfile'
import Facilities from '../../screens/App/Service/Facilities'
import Payment from '../../screens/App/Payment'
import BookingServiceList from '../../screens/App/Service/BookingServiceList/BookingServiceList'
import ChatBot from '../../screens/App/Chatbot'
import Events from '../../screens/App/Events'
import FileList from '../../screens/App/FileList'
import FlashMessage from 'react-native-flash-message'
import AddOutsourcingServiceScreen from '../../screens/App/OutsourcingService'
import Advertisement from '../../screens/App/Advertisement'
import ServiceAdvertisementScreen from '../../screens/App/ServiceAdvertisementScreen'
import OutsourcingServiceUpdate from '../../screens/App/ServiceAdvertisementScreen/OutsourcingServiceUpdate'
import AdvertisementUpdate from '../../screens/App/ServiceAdvertisementScreen/AdvertisementUpdate'
const Stack = createStackNavigator()

function TabScreens() {
  React.useEffect(() => {
    socket.emit('connection')
  }, [])
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

      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ApartmentDetails"
        component={ApartmentDetails}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="BookService"
        component={BookService}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Feedback"
        component={Feedback}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ChatMessage"
        component={ChatMessage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Facilities"
        component={Facilities}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookingServiceList"
        component={BookingServiceList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatBot"
        component={ChatBot}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Events"
        component={Events}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FileList"
        component={FileList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddOutsourcingServiceScreen"
        component={AddOutsourcingServiceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Advertisement"
        component={Advertisement}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ServiceAdvertisementScreen"
        component={ServiceAdvertisementScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OutsourcingServiceUpdate"
        component={OutsourcingServiceUpdate}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdvertisementUpdate"
        component={AdvertisementUpdate}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default function Stacks() {
  return (
    <NavigationContainer>
      <TabScreens />
      <FlashMessage position="top" />
    </NavigationContainer>
  )
}
