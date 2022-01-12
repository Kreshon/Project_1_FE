import axios from "axios";
import React,{ useState , useEffect, useRef } from "react";
import { User } from "../entities/user";
import userService from "../service/user-service";

// To do
// implement login func.
// add session storage
// redirect to a reimbursement pages, based on permission level
// stretch goals, add link to register, file upload for reimb
export default function LoginComponent() {


    const usernameInput = useRef(null);
    const passwordInput = useRef(null);

    async function login(){

        const loginPayload = {
            username: usernameInput.current.value,
            password: passwordInput.current.value
        }

        const user = await userService.login(loginPayload);

        sessionStorage.setItem("username", user.username);
        sessionStorage.setItem("id", user.id);
        sessionStorage.setItem("isEmployee",`${user.isManager}`);

    }
    

    return(<>
        <h1>"Company" Login Page</h1>
        <br/>
        <label htmlFor="usernameInput">Username</label>
        <input ref={usernameInput} type="text" id="usernameInput" />

        <label htmlFor="passwordInput">Password</label>
        <input ref={passwordInput} type="password" id="passwordInput" />

        <button onClick={login}>Login</button>
    </>)
}