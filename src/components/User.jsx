/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, {useContext, useState} from 'react'

import { UserType } from '../UserContext'
import { BASE_URL } from '../api'

const User = ({user}) => {
  const { userId, setUserId } = useContext(UserType)
  const [requestSent, setRequestSent] = useState(false)
  const [requests, setRequests] = useState([])

  const sendfriendRequest = async (currentUserId, selectedUserId) => {
    console.log("reaching here")
    try {
      const response = await fetch(`${BASE_URL}/friend-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          currentUserId,
          selectedUserId
        })
      })

      console.log("response === ", response.ok)

      if(response.ok) {
        setRequestSent(true)
      }
    } catch(error) {
      console.log("error message = ", error)
    }
  }

  return (
    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginVertical: 10}}>
      <View>
        <Image 
          source={{ uri: user.image }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            resizeMode: "cover"
          }}
        />
      </View>

      <View style={{ marginLeft: 12, flex: 1}}>
        <Text style={{ fontWeight: "bold"}}>{user?.name}</Text>
        <Text style={{ marginTop: 4, color: "gray"}}>{user?.email}</Text>
      </View>

      <TouchableOpacity style={{ backgroundColor: "#567189", padding: 10, borderRadius: 6, width: 135}} onPress={() => sendfriendRequest(userId, user._id)}>
        <Text style={{ textAlign: "center", color: "white", fontSize: 13}}>

          Add Friend
          </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default User

const styles = StyleSheet.create({})