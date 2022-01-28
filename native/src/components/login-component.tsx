import axios from "axios";
import { response } from "express";
import React,{ useState , useEffect, useRef } from "react";
import { User } from "../entities/user";
import userService from "../service/user-service";
import { getAllUsers, updateLoggedUser } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store/store";
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { TextInput, View, Text, Pressable } from "react-native";
import styles from "../../company-style"
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginComponent() {

    const dispatch = useDispatch()
    const navigate = useNavigation()
    const [usernameInput, setUsernameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")

    async function login(){
        console.log(usernameInput)
        console.log(passwordInput)
        if(usernameInput && passwordInput){const loginPayload = {
            username: usernameInput,
            password: passwordInput
        }

        // session storage typically stores things as strings
        const user = await userService.login(loginPayload)
        AsyncStorage.setItem("username", user.username);
        AsyncStorage.setItem("id", user.id);
        AsyncStorage.setItem("isManager",`${user.isManager}`);


        // const user = await userService.login(loginPayload)
        // console.log(user)
        // AsyncStorage.setItem("employeeId", user.id)
        dispatch(updateLoggedUser(user))

        navigate.navigate("Reimbursement")
    }}

    // React.useEffect(()=> {
    //     const getLoggedUserId = async()=> 
    //   {
    //     const id = await AsyncStorage.getItem("employeeId")
    //     console.log(id)
    //     userService.getUserById(id).then((response)=> (dispatch(updateLoggedUser(response))))
    //   }
    //     getLoggedUserId()
        
    //   },[]);
    

    return(<>
    <View style={styles.loginDiv}>
        <Text style={styles.h1}>"Company" Login Page</Text>
        <Text style={styles.label}>Username: </Text>
        <TextInput style={styles.input} value={usernameInput} onChangeText={(value)=>setUsernameInput(value)}/>
        <Text style={styles.label}>Password: </Text>
        <TextInput style={styles.input} value={passwordInput} secureTextEntry onChangeText={(value)=>setPasswordInput(value)}/>
        <Pressable style={styles.button} onPress={login}>
            <Text>
                Login
            </Text>
        </Pressable>
    </View>
    </>)
}