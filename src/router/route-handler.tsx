import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginComponent from '../components/login-component'
import NavBar from '../components/nav-bar';
import ReimbursementList from '../components/reimbursment-list'

export default function RouteHandler(){



    return(<>
        <BrowserRouter>

            <NavBar/>

            <Routes>
                <Route path="login" element={<LoginComponent/>}/>
                <Route path="reimbursements" element={<ReimbursementList/>}/>
            </Routes>
        </BrowserRouter>
    </>)

}