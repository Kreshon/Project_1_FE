import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginComponent from '../components/login-component'
import NavBar from '../components/nav-bar';
import ReimbursementList from '../components/reimbursment-list'
import userService from '../service/user-service';
import { getAllUsers } from '../store/actions';
import { AppState } from '../store/store';
import { getAllReimbursements } from '../store/actions';
import reimbursementService from '../service/reimbursement-service';


export default function RouteHandler(){

    const dispatch = useDispatch()
    const reimbursements = useSelector((state:AppState)=>state.reimbursements)
    const users = useSelector((state:AppState)=>state.users)
    console.log(users)

    useEffect(()=>{
        userService.getAllUsers().then((response)=>{
            dispatch(getAllUsers(response))
        })
    },[])  

    useEffect(()=>{
        reimbursementService.getAllReimbursements().then((response)=>{
            dispatch(getAllReimbursements(response))
        })
    },[])


    return(<>
        <BrowserRouter>

            <NavBar/>

            <Routes>
                <Route path="login" element={<LoginComponent/>}/>
                <Route path="reimbursements" element={<ReimbursementList reimbursements={reimbursements} users={users}/>}/>
            </Routes>
            
        </BrowserRouter>
    </>)

}