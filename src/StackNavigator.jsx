/* eslint-disable prettier/prettier */
import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { FriendScreen, HomeScreen, LoginScreen, RegisterScreen, ChatScreen, ChatMessagesScreen } from './screens'


const Stack = createStackNavigator()

const StackNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false}}  />
            <Stack.Screen name="Home" component={HomeScreen}  />
            <Stack.Screen name="Friends" component={FriendScreen}  />
            <Stack.Screen name="Chat" component={ChatScreen}  />
            <Stack.Screen name="Messages" component={ChatMessagesScreen}  />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator