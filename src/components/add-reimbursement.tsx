import { Reimbursement } from "../entities/reimbursement";
import { User } from "../entities/user";
import reimbursementService from '../service/reimbursement-service';
import React,{ useState , useEffect, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import userService from "../service/user-service";
import { getUser, getReimbursement, updateReimbursement, getAllReimbursements } from "../store/actions";


export default function AddReimbursement(){

    const employeeId = sessionStorage.getItem("id");
    const navigate = useNavigate()
    const [amount, setAmount] = useState()
    const [commentEmployee, setCommentEmployee] = useState()

    const dispatch = useDispatch()

    function handleChangeAmount(event: any){
        setAmount(event.target.value)
    }

    function handleCommentEmployee(event: any){
        setCommentEmployee(event.target.value)
    }

    function saveReimbursement(){
        const newReimbursement: Reimbursement = {
            id: "",
            employeeId: employeeId,
            amount: amount,
            status: "pending",
            commentEmployee: commentEmployee,
            commentManager: ""
    }

        reimbursementService.createReimbursement(newReimbursement).then((response)=>{
            reimbursementService.getAllReimbursements().then((response)=>{
                dispatch(getAllReimbursements(response))})})
        
        navigate("../../reimbursements")
    }

    return(<>
        <h1>Add Reimbursement here</h1>
        <p>Amount: <input onChange={handleChangeAmount} type="text" id="Amount" value={amount}/></p>
        <p>Employee Comment: <input onChange={handleCommentEmployee} type="text" id="Employee Comment" value={commentEmployee}/></p>
        <br/><br/>
        <button onClick={saveReimbursement}>Save Reimbursement</button>
    </>)
}