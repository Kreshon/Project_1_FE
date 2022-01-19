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
import DetailReimbursement from '../components/detail-reimbursement';
import Statistics from '../components/statistics';
import AddReimbursement from '../components/add-reimbursement';


export default function RouteHandler(){

    const dispatch = useDispatch()
    const reimbursements = useSelector((state:AppState)=>state.reimbursements)
    const users = useSelector((state:AppState)=>state.users)
    const reimbursement = useSelector((state:AppState)=>state.reimbursement)
    const user = useSelector((state:AppState)=>state.user)

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
                {users.length > 0 && reimbursements.length > 0 ? <Route path="reimbursements" element={<ReimbursementList reimbursements={reimbursements} users={users}/>}/>:null}
                <Route path="reimbursements/:id" element={<DetailReimbursement reimbursement={reimbursement} user={user}/>}/>
                <Route path="statistics" element={<Statistics/>}/>
                <Route path="reimbursements/add" element={<AddReimbursement/>}/>
                <Route path="" element={<LoginComponent/>}/>
            </Routes>
            
        </BrowserRouter>
    </>)

}