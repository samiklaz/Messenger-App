/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, {useContext} from 'react'
import { BASE_URL } from '../api'
import { UserType } from '../UserContext'
import { useNavigation } from '@react-navigation/native'

const FriendRequest = ({item, friendRequests, setFriendRequests}) => {
    const navigation = useNavigation()
    const {userId, setUserId} = useContext(UserType)
    const acceptRequest = async (friendRequestId) => {
        try {
            const response = await fetch(`${BASE_URL}/friend-request/accept`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    senderId: friendRequestId,
                    recipientId: userId,
                })
            })

            if(response.ok) {
                setFriendRequests(friendRequests.filter((request) => request._id !== friendRequestId))
                navigation.navigate("Chat")
            }
        } catch(error) {
            console.log("Error accepting the friend request ", error)
        }
    }

  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 10, }}>
        <View>
            <Image  
                style={{width: 50, height: 50, borderRadius: 25}}
                source={{
                    uri: item.image
                }}
            />
        </View>

        <Text style={{ flexWrap: "wrap", width: "40%", fontSize: "15", fontWeight: "bold", flex: 1, marginLeft: 10, }}>{item?.name} sent you a Friend request</Text>

        <TouchableOpacity style={{ backgroundColor: "#0066b2", padding: 10, borderRadius: 6, width: 100}} onPress={() => acceptRequest(item._id)}>
            <Text style={{ textAlign: "center", color: "white"}}>Accept</Text>
        </TouchableOpacity>
    </View>
  )
}

export default FriendRequest

const styles = StyleSheet.create({})