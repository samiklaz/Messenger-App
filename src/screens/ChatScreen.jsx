/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, {useEffect, useState, useContext} from 'react'
import { useNavigation } from '@react-navigation/native'
import { UserType } from '../UserContext'
import { BASE_URL } from '../api'
import { UserChat } from '../components'

const ChatScreen = () => {
    const {userId, setUserId} = useContext(UserType)
    const [acceptedFriends, setAcceptedFriends] = useState([])
    const navigation = useNavigation()

    useEffect(() => {
        const acceptedFriendsList = async () => {
            try {
                const response = await fetch(`${BASE_URL}/accepted-friends/${userId}`)
                const data = await response.json()

                if(response.ok) {
                    setAcceptedFriends(data)
                }
            } catch(error) {
                console.log("error showing the accepted friends ", error)
            }
        }

        acceptedFriendsList()
    }, [])

    console.log("accepted friends == ", acceptedFriends)
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity>
            {acceptedFriends.map((item, index) => (
                <UserChat key={index} item={item} navigation={navigation} />
            ))}
        </TouchableOpacity>
    </ScrollView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})