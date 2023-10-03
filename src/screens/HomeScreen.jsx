/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwtDecode from 'jwt-decode'
import axios from "axios"

import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { UserType } from '../UserContext'
import { User } from '../components'


const HomeScreen = ({ navigation }) => {
  const { userId, setUserId } = useContext(UserType)
  const [users, setUsers] = useState([])
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 10 }}>Swift Chat</Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginRight: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
            <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Friends")}>
            <MaterialIcons  name="people-outline" size={24} color="black" />
          </TouchableOpacity>
          
        </View>
      )
    })
  }, [])

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken")
      const decodedToken = jwtDecode(token)
      const userId = decodedToken.userId
      setUserId(userId)
      axios.get(`http://10.0.2.2:3000/users/${userId}`).then((response) => {
        setUsers(response.data)
      }).catch((error) => {
        console.log('Error is == ', error)
      })
    }

    fetchUsers()
  }, [])


  return (
    <View>
      <View style={{ padding: 10 }}>
        {users.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})