/* eslint-disable prettier/prettier */
import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeScreen, LoginScreen, RegisterScreen } from './screens'


const Stack = createStackNavigator()

const StackNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false}}  />
            <Stack.Screen name="Home" component={HomeScreen}  />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator