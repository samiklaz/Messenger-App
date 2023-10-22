/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useContext, useEffect, useState } from 'react'
import Entypo from "react-native-vector-icons/Entypo"
import Feather from "react-native-vector-icons/Feather"
import EmojiSelector from "react-native-emoji-selector";

import { UserType } from '../UserContext'
import { useRoute } from '@react-navigation/native';
import { BASE_URL } from '../api';

const ChatMessagesScreen = () => {
    const route = useRoute()
    const { userId, setUserId } = useContext(UserType)
    const [selectedImage, setSelectedImage] = useState("")
    const [showEmojiSelector, setShowEmojiSelector] = useState(false)
    const [message, setMessage] = useState('')
    const handleEmojiPress = () => {
        setShowEmojiSelector(!showEmojiSelector)
    } 
    
    const {recipientId} = route.params

    const handleSend = async (messageType, imageUri) => {
        try {
            const formData = new FormData()
            formData.append("senderId", userId)
            formData.append("recipientId", recipientId)

            // check if the message type is image or normal text
            if(messageType == "image") {
                formData.append("messageType", "image")
                formData.append("imageFile", {
                    uri: imageUri,
                    name: "image/jpg",
                    type: "image/jpeg",
                })
            } else {
                formData.append("messageType", "text")
                formData.append("messageText", message)
            }

            const response = await fetch(`${BASE_URL}/messages`, {
                method: "POST",
                body: formData
            })

            if(response.ok) {
                setMessage("")
                setSelectedImage("")
            }
        } catch(error) {
            console.log("error in sending the message ", error)
        }
    }
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#F0F0F0"}}>
        <ScrollView>
            {/* All the chat messages go here */}

        </ScrollView>

        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 10, paddingVertical: 10, borderTopWidth: 1, borderTopColor: "#dddddd", marginHorizontal: 10,}}>

            <TouchableOpacity onPress={handleEmojiPress}>
                <Entypo name="emoji-happy" size={24} color="gray" style={{ marginRight: 5}} />
            </TouchableOpacity>
            
            <TextInput 
                placeholder='Type your message..'
                style={{
                    flex: 1,
                    height: 40,
                    borderWidth: 1,
                    borderColor: "#dddddd",
                    borderRadius: 20,
                    paddingHorizontal: 10,
                }}
                value={message}
                onChangeText={(text) => setMessage(text)}
            />

            <View style={{ flexDirection: "row", alignItems: "center", gap: 7, marginHorizontal: 8}}>
                <Entypo name="camera" size={24} color="gray" />
                <Feather name="mic" size={24} color="gray" />
            </View>
            
            <TouchableOpacity 
                onPress={() => handleSend("text")}
                style={{ backgroundColor: "#007bff", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, }}
            >
                <Text style={{ color: "white", fontWeight: 'bold'}}>Send</Text>
            </TouchableOpacity>
        </View>



        {/* {showEmojiSelector && (
            <EmojiSelector 
                showTabs={true} 
                showSearchBar={true} 
                showHistory={true} 
                columns={10}
                style={{ height: 250, }} 
                onEmojiSelected={(emoji) => {
                    setMessage((prevMessage) => prevMessage + emoji)
                }} 
            />
        )}  */}
    </KeyboardAvoidingView>
  )
}

export default ChatMessagesScreen

const styles = StyleSheet.create({})