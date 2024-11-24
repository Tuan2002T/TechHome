import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../../screens/App/Home'
import { Text } from 'react-native'
import Chat from '../../screens/App/Chat'

import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import Bill from '../../screens/App/Bill'
import Profile from '../../screens/App/Profile'
import Service from '../../screens/App/Service'

const Tab = createBottomTabNavigator()

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: 'white',
          height: 60,
          borderTopWidth: 0 // Remove the border
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          let rn = route.name
          if (rn === 'Home') {
            iconName = focused ? (
              <Ionicons name="home" size={24} color="black" />
            ) : (
              <Ionicons name="home" size={24} color="gray" />
            )
          } else if (rn === 'Chat') {
            iconName = focused ? (
              <Ionicons name="chatbox-ellipses" size={24} color="black" />
            ) : (
              <Ionicons name="chatbox-ellipses" size={24} color="gray" />
            )
          } else if (rn === 'Service') {
            iconName = focused ? (
              <MaterialIcons name="window" size={24} color="black" />
            ) : (
              <MaterialIcons name="window" size={24} color="gray" />
            )
          } else if (rn === 'Bill') {
            iconName = focused ? (
              <FontAwesome6 name="file-invoice" size={24} color="black" />
            ) : (
              <FontAwesome6 name="file-invoice" size={24} color="gray" />
            )
          } else if (rn === 'Profile') {
            iconName = focused ? (
              <Ionicons name="person" size={24} color="black" />
            ) : (
              <Ionicons name="person" size={24} color="gray" />
            )
          }
          return iconName
        },
        tabBarLabel: ({ focused }) => {
          let label
          let rn = route.name
          if (rn === 'Home') {
            label = focused ? (
              <Text style={{ color: 'black', fontSize: 12 }}>Home</Text>
            ) : (
              <Text style={{ color: 'gray', fontSize: 12 }}>Home</Text>
            )
          } else if (rn === 'Chat') {
            label = focused ? (
              <Text style={{ color: 'black', fontSize: 12 }}>Chat</Text>
            ) : (
              <Text style={{ color: 'gray', fontSize: 12 }}>Chat</Text>
            )
          } else if (rn === 'Service') {
            label = focused ? (
              <Text style={{ color: 'black', fontSize: 12 }}>Service</Text>
            ) : (
              <Text style={{ color: 'gray', fontSize: 12 }}>Service</Text>
            )
          } else if (rn === 'Bill') {
            label = focused ? (
              <Text style={{ color: 'black', fontSize: 12 }}>Bill</Text>
            ) : (
              <Text style={{ color: 'gray', fontSize: 12 }}>Bill</Text>
            )
          } else if (rn === 'Profile') {
            label = focused ? (
              <Text style={{ color: 'black', fontSize: 12 }}>Profile</Text>
            ) : (
              <Text style={{ color: 'gray', fontSize: 12 }}>Profile</Text>
            )
          }
          return label
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12
        },
        tabBarItemStyle: {
          borderRadius: 10,
          padding: 5
        }
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Service"
        component={Service}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Bill"
        component={Bill}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}

export default Tabs
