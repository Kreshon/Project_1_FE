import axios from "axios";
import { response } from "express";
import React,{ useState , useEffect, useRef } from "react";
import { User } from "../entities/user";
import userService from "../service/user-service";
import { getAllUsers, updateLoggedUser } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store/store";
import { TextInput, View, Text, Pressable, Modal } from "react-native";
import styles from "../../company-style"
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginComponent() {

    const dispatch = useDispatch()
    const navigate = useNavigation()
    const [usernameInput, setUsernameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [modalVisible, setModalVisible] = useState(false)

    async function login(){
        if(usernameInput && passwordInput){const loginPayload = {
            username: usernameInput,
            password: passwordInput
        }

        // session storage typically stores things as strings
        const user = await userService.login(loginPayload)
        if(user){

        if(user.isManager){
        AsyncStorage.setItem("username", user.username);
        AsyncStorage.setItem("id", user.id);
        AsyncStorage.setItem("isManager",`${user.isManager}`);

            dispatch(updateLoggedUser(user))
            
            navigate.navigate("Reimbursement")}else{
                setModalVisible(true);
            }}
    }}    

    return(<>
    <View style={styles.loginDiv}>
        <Text style={styles.h1}>"PSN" Login Page</Text>
        <Text style={styles.label}>Username: </Text>
        <TextInput style={styles.input} value={usernameInput} onChangeText={(value)=>setUsernameInput(value)}/>
        <Text style={styles.label}>Password: </Text>
        <TextInput style={styles.input} value={passwordInput} secureTextEntry onChangeText={(value)=>setPasswordInput(value)}/>
        <Pressable onPress={login}>
            <Text style={styles.button}>
                Login
            </Text>
        </Pressable>
        <Modal visible={modalVisible}>
            <View style={styles.loginDiv}>
            <Text style={styles.h1}>
                Know your place in the company, GET BACK TO WORK!
            </Text>
            <Pressable onPress={()=> setModalVisible(false)}>
                <Text style={styles.buttonL}>
                    You got it Boss
                </Text>
            </Pressable>
            <Text style={styles.h1}>
                Don't make me take your phone away!
            </Text>
            </View>
        </Modal>
    </View>
    </>)
}