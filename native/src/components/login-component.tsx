import axios from "axios";
import { response } from "express";
import React,{ useState , useEffect, useRef } from "react";
import { User } from "../entities/user";
import userService from "../service/user-service";
import { getAllUsers } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store/store";
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { TextInput, View, Text, Pressable } from "react-native";
import styles from "../../company-style"
import { useNavigation } from "@react-navigation/native";


export default function LoginComponent() {

    const navigate = useNavigation()
    const [usernameInput, setUsernameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")

    async function login(){

        if(usernameInput && passwordInput){const loginPayload = {
            username: usernameInput,
            password: passwordInput
        }

        const user = await userService.login(loginPayload)

        // session storage typically stores things as strings
        sessionStorage.setItem("username", user.username);
        sessionStorage.setItem("id", user.id);
        sessionStorage.setItem("isManager",`${user.isManager}`);

        //navigate.navigate("/reimbursements")
    }}
    

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