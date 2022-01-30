import axios from "axios";
import { response } from "express";
import React,{ useState , useEffect, useRef } from "react";
import { User } from "../entities/user";
import userService from "../service/user-service";
import { getAllUsers } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store/store";
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import "../company-style.css"


export default function LoginComponent() {

    const navigate = useNavigate()
    const usernameInput = useRef(null);
    const passwordInput = useRef(null);

    async function login(){

        const loginPayload = {
            username: usernameInput.current.value,
            password: passwordInput.current.value
        }

        console.log(loginPayload)
        const user = await userService.login(loginPayload);

        // session storage typically stores things as strings
        sessionStorage.setItem("username", user.username);
        sessionStorage.setItem("id", user.id);
        sessionStorage.setItem("isManager",`${user.isManager}`);

        navigate("/reimbursements")
    }
    

    return(<>
    <div id="loginDiv">
        <h1 className="h1">"PSN" Login Page</h1>
        <br/>
        <label className="label" htmlFor="usernameInput">Username: </label>
        <input className="input" ref={usernameInput} type="text" id="usernameInput" />
        <br/>
        <label className="label" htmlFor="passwordInput">Password: </label>
        <input className="input" ref={passwordInput} type="password" id="passwordInput" />
        <br/><br/>
        <button className="button" onClick={login}>Login</button>
    </div>
    </>)
}