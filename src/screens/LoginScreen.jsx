/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Pressable, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken")
                if(token) {
                    navigation.navigate("Home")
                } else {
                    // token not found, show the log in screen
                }
            } catch(error) {
                console.log("error == ", error)
            }
            
        }

        checkLoginStatus()
    }, [])

    const handleLogin = async () => {
        const user = {
            email: email,
            password: password
        }

        await axios.post(
            'http://10.0.2.2:3000/login', 
            user
        ).then((response) => {
            console.log("response === ", response.data)
            const token = response.data.token
            AsyncStorage.setItem("authToken", token)

            navigation.navigate("Home")
            
        }).catch((error)  => {
            Alert.alert(
                "Login Failed",
                "An error occured while login"
            )
            console.log("error == ", error)
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white", padding: 10, alignItems: "center" }}>
            <KeyboardAvoidingView>
                <View style={{ marginTop: 100, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "#4a55a2", fontSize: 17, fontWeight: "600" }}>Sign In</Text>
                    <Text style={{ fontSize: 17, fontWeight: "600", marginTop: 15 }}>Sign In to Your Account</Text>
                </View>

                <View style={{ marginTop: 50, }}>
                    <View>
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
                            secureTextEntry
                        />
                    </View>


                    <TouchableOpacity style={{ width: 200, backgroundColor: "#4a55a2", padding: 15, marginTop: 20, marginLeft: "auto", marginRight: "auto", borderRadius: 6, }} onPress={handleLogin}>
                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginTop: 15 }} onPress={() => navigation.navigate('Register')}>
                        <Text style={{ textAlign: "center", color: "gray", fontSize: 16, }}>Don't have an account? Sign up</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})