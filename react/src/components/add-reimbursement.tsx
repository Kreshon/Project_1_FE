import { Reimbursement } from "../entities/reimbursement";
import reimbursementService from '../service/reimbursement-service';
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { getAllReimbursements } from "../store/actions";
import "../company-style.css"
import winston from 'winston'
import logConfig from '../../utils/logger'

export default function AddReimbursement(){

    const employeeId = sessionStorage.getItem("id");
    const navigate = useNavigate()
    const [amount, setAmount] = useState()
    const [commentEmployee, setCommentEmployee] = useState()
    const logger = winston.createLogger(logConfig);
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
                    logger.info("Reimbursement saved")
        navigate("../../reimbursements")
    }

    return(<>
    <div id="addDiv">
        <h1 className="h1">Add Reimbursement here</h1>
        <p className="p">Amount: <input className="input" onChange={handleChangeAmount} type="text" id="Amount" value={amount}/></p>
        <p className="p">Employee Comment: <input className="input" onChange={handleCommentEmployee} type="text" id="Employee Comment" value={commentEmployee}/></p>
        <br/><br/>
        <button className="button" onClick={saveReimbursement}>Save Reimbursement</button>
    </div>
    </>)
}