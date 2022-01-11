import React,{ useState , useEffect } from "react";
import { User } from "../entities/user";
import userService from "../service/user-service";

export default function LoginComponent() {

    const [currentUsers, setCurrentUsers] = useState<User[]>();

    useEffect(()=>{
        userService.getAllUsers().then(result => {
            setCurrentUsers(result)
        })
    },[]);
    console.log(currentUsers);
    return(<>
        <p>{currentUsers && currentUsers.map(user => {return <p>{`${user.fname} ${user.lname} ${user.id} ${user.isManager}`}</p>})}</p>
    </>)
}