import { useRef } from "react";
import userService from "../service/user-service";
import { useNavigate } from 'react-router-dom'
import "../company-style.css"
import winston from 'winston'
import logConfig from '../../utils/logger'

export default function LoginComponent() {

    const navigate = useNavigate()
    const usernameInput = useRef(null);
    const passwordInput = useRef(null);
    const logger = winston.createLogger(logConfig);
    async function login(){

        const loginPayload = {
            username: usernameInput.current.value,
            password: passwordInput.current.value
        }

        const user = await userService.login(loginPayload);
        // session storage typically stores things as strings
        sessionStorage.setItem("username", user.username);
        sessionStorage.setItem("id", user.id);
        sessionStorage.setItem("isManager",`${user.isManager}`);
        logger.info("Logged in")
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