/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Pressable, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'

const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState('')

    const handleSubmit = async () => {
        const user = {
            name: name,
            email: email,
            image: image,
            password: password
        }

        await axios.post(
            'http://10.0.2.2:3000/register', 
            user
        ).then((response) => {
            console.log("response === ", response)
            Alert.alert(
                "Registration Successful",
                "You have been registered Successfully"
            )
            setName('')
            setEmail('')
            setImage('')
            setPassword('')
        }).catch((error)  => {
            Alert.alert(
                "Registration Failed",
                "An error occured while registering"
            )
            console.log("error == ", error)
        })
    }
    return (
        <View style={{ flex: 1, backgroundColor: "white", padding: 10, alignItems: "center" }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 100, justifyContent: "center", alignItems: "center",  }}>
                    <Text style={{ color: "#4a55a2", fontSize: 17, fontWeight: "600" }}>Sign Up</Text>
                    <Text style={{ fontSize: 17, fontWeight: "600", marginTop: 15 }}>Sign In to Your Account</Text>
                </View>

                

                <View style={{ marginTop: 50, }}>

                   <View>
                        <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>Name</Text>
                        <TextInput
                            value={name}
                            onChangeText={(text) => setName(text)}
                            style={{
                                fontSize: name ? 18 : 16,
                                borderBottomColor: "gray",
                                borderBottomWidth: 1,
                                marginVertical: 10,
                                width: 300
                            }}
                            placeholder='Enter your Name'
                            placeholderTextColor="black"
                        />
                    </View>


                    <View style={{ marginTop: 10, }}>
                        <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>Email</Text>
                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={{
                                fontSize: email ? 18 : 16,
                                borderBottomColor: "gray",
                                borderBottomWidth: 1,
                                marginVertical: 10,
                                width: 300
                            }}
                            placeholder='Enter your Email'
                            placeholderTextColor="black"
                        />
                    </View>

                    <View style={{ marginTop: 10, }}>
                        <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                            Password
                        </Text>
                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            style={{
                                fontSize: password ? 18 : 16,
                                borderBottomColor: "gray",
                                borderBottomWidth: 1,
                                marginVertical: 10,
                                width: 300
                            }}
                            placeholder='Enter your Password'
                            placeholderTextColor="black"
                        />
                    </View>

                    <View style={{ marginTop: 10, }}>
                        <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                            Image
                        </Text>
                        <TextInput
                            value={image}
                            onChangeText={(text) => setImage(text)}
                            style={{
                                fontSize: password ? 18 : 16,
                                borderBottomColor: "gray",
                                borderBottomWidth: 1,
                                marginVertical: 10,
                                width: 300
                            }}
                            placeholder='Enter your Image'
                            placeholderTextColor="black"
                        />
                    </View>


                    <TouchableOpacity style={{ width: 200, backgroundColor: "#4a55a2", padding: 15, marginTop: 20, marginLeft: "auto", marginRight: "auto", borderRadius: 6, }} onPress={handleSubmit}>
                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginTop: 15, marginBottom: 40 }} onPress={() => navigation.navigate('Login')}>
                        <Text style={{ textAlign: "center", color: "gray", fontSize: 16, }}>Don't have an account? Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})