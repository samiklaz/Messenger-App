/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import Entypo from "react-native-vector-icons/Entypo"
import Feather from "react-native-vector-icons/Feather"
import EmojiSelector from 'react-native-emoji-selector'

const ChatMessagesScreen = () => {
    const [showEmojiSelector, setShowEmojiSelector] = useState(false)
    const [message, setMessage] = useState('')
    const handleEmojiPress = () => {
        setShowEmojiSelector(!showEmojiSelector)
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
            
            <TouchableOpacity style={{ backgroundColor: "#007bff", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, }}>
                <Text style={{ color: "white", fontWeight: 'bold'}}>Send</Text>
            </TouchableOpacity>
        </View>

        {showEmojiSelector && (
            <EmojiSelector style={{ height: 250, }} onEmojiSelected={(emoji) => {
                setMessage((prevMessage) => prevMessage + emoji)
            }} />
        )}
    </KeyboardAvoidingView>
  )
}

export default ChatMessagesScreen

const styles = StyleSheet.create({})