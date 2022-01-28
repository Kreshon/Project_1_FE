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

export default function LogoutComponent(){

    const dispatch = useDispatch()
    const navigate = useNavigation()

    function logout(){

    dispatch(updateLoggedUser({
        fname: "",
        lname: "",
        id: "",
        username: "",
        password: "",
        isManager: false
    }))

    AsyncStorage.clear()
    
        navigate.navigate("Login")

    }

    return(
        <View>
            <Text style={styles.h1}>
                Do you wish to logout?
            </Text>
            <Pressable style={styles.button} onPress={logout}>
                <Text>
                    Logout
                </Text>
            </Pressable>
        </View>
    )
}