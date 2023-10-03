/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useContext, useState} from 'react'
import axios from 'axios'
import { BASE_URL } from '../api'
import { UserType } from '../UserContext'
import { FriendRequest } from '../components'

const FriendScreen = () => {
  const {userId, setUserId} = useContext(UserType)
  const [friendRequests, setFriendRequests] = useState([])
  const FetchFriendRequest = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/friend-request/${userId}`)
      if(response.status == 200) {
        const friendRequestData = response.data.map((friendRequest) => ({
          _id: friendRequest._id,
          name: friendRequest.name,
          email: friendRequest.email,
          image: friendRequest.image
        }))
        setFriendRequests(friendRequestData)
      }
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    FetchFriendRequest()
  }, [])

  return (
    <View style={{ padding: 10, marginHorizontal: 12}}>
      {friendRequests.length > 0  && <Text>Your Friend Requests</Text>}

      {friendRequests.map((item, index) => (
        <FriendRequest 
          key={index} 
          item={item} 
          friendRequests={friendRequests} 
          setFriendRequests={setFriendRequests}  
        />
      ))}
      
    </View>
  )
}

export default FriendScreen

const styles = StyleSheet.create({})