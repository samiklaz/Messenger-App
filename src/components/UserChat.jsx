/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const UserChat = ({item, navigation}) => {
  return (
    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", gap: 10, borderWidth: 0.7, borderColor: "#D0D0D0", borderTopWidth: 0,  borderLeftWidth: 0, borderRightWidth: 0, padding: 10,}} onPress={() => navigation.navigate("Messages",{
        recipientId: item._id
    })}>
        <Image 
            source={{
                uri: item.image
            }}
            style={{ width: 50, height: 50, borderRadius: 25, resizeMode: "cover" }}
        />

        <View style={{ flex: 1,}}>
            <Text style={{ fontSize: 15, fontWeight: "500"}}>{item?.name}</Text>
            <Text style={{ color: "gray", marginTop: 3, fontWeight: "500"}}>Last Message comes here</Text>
        </View>

        <View style={{ }}>
            <Text style={{ fontSize: 11, fontWeight: "400", color: "#585858"}}>3:00pm</Text>
        </View>
    </TouchableOpacity>
  )
}

export default UserChat

const styles = StyleSheet.create({})