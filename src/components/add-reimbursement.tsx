import { Reimbursement } from "../entities/reimbursement";
import { User } from "../entities/user";
import reimbursementService from '../service/reimbursement-service';
import React,{ useState , useEffect, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import userService from "../service/user-service";
import { getUser, getReimbursement, updateReimbursement } from "../store/actions";

interface AddReimbursementProps {
    user: User;
}

export default function AddReimbursement(props: AddReimbursementProps){

    const user = props.user;

    const [amount, setAmount] = useState()
    const [commentEmployee, setCommentEmployee] = useState()

    function handleChangeAmount(event: any){
        setAmount(event.target.value)
    }

    function handleCommentEmployee(event: any){
        setCommentEmployee(event.target.value)
    }

    return(<>
        <h1>Add Reimbursement here</h1>
        <p>Amount: <input onChange={handleChangeAmount} type="text" id="Amount" value={amount}/></p>
        <p>Employee Comment: <input onChange={handleCommentEmployee} type="text" id="Employee Comment" value={commentEmployee}/></p>
    </>)
}