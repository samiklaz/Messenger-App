/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { UserType } from '../UserContext'

const HomeScreen = ({navigation}) => {
  const {userId, setUserId} = useContext(UserType)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 10}}>Swift Chat</Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginRight: 10}}>
          <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
          <MaterialIcons name="people-outline" size={24} color="black" />
        </View>
      )
    })
  }, [])

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken")
    }
  }, [])
  
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})