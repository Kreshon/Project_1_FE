import { Reimbursement } from "../entities/reimbursement";
import { User } from "../entities/user";
import reimbursementService from '../service/reimbursement-service';
import React,{ useState , useEffect, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import userService from "../service/user-service";
import { getUser, getReimbursement, updateReimbursement, getAllReimbursements } from "../store/actions";
import "../company-style.css"

interface DetailReimbursementProps {
    reimbursement: Reimbursement;
    user: User;
}

export default function DetailReimbursement(props: DetailReimbursementProps){
    const navigate = useNavigate()

    const {id} = useParams()
    const reimbursement = props.reimbursement;
    const user = props.user;

    const dispatch = useDispatch()

    let isManager
    if(sessionStorage.getItem("isManager")){isManager = sessionStorage.getItem("isManager")}
    if(isManager === "true"){
        isManager = true;
    }else{
        isManager = false;
    }

    let matchId
    if(sessionStorage.getItem("id")){matchId = sessionStorage.getItem("id")}

    
    useEffect(()=>{
        if(id){
        reimbursementService.getReimbursementById(id).then((response)=>{
            dispatch(getReimbursement(response))
        })}
    },[id])

    const [amount, setAmount] = useState(reimbursement.amount)
    const [commentEmployee, setCommentEmployee] = useState(reimbursement.commentEmployee)
    const [commentManager, setCommentManager] = useState(reimbursement.commentManager)

    function handleChangeAmount(event: any){
        setAmount(event.target.value)
    }

    function handleCommentEmployee(event: any){
        setCommentEmployee(event.target.value)
    }

    function handleCommentManager(event: any){
        setCommentManager(event.target.value)
    }

    function saveChanges(){
        const updatedReimbursement = {...reimbursement}
        updatedReimbursement.amount = amount; 
        updatedReimbursement.commentEmployee = commentEmployee;
        updatedReimbursement.commentManager = commentManager;

        reimbursementService.updateReimbursement(updatedReimbursement).then((response)=>{
            reimbursementService.getAllReimbursements().then((response)=>{
                dispatch(getAllReimbursements(response))})})
        
        navigate("../../reimbursements")
    }

    function changeStatus(reviewedStatus){
        const updatedReimbursement = {...reimbursement}
        updatedReimbursement.status = reviewedStatus;
        reimbursementService.updateReimbursement(updatedReimbursement).then((response)=>{
            reimbursementService.getAllReimbursements().then((response)=>{
                dispatch(getAllReimbursements(response))})})
        
        navigate("../../reimbursements")
    }

    // function test(x){
    //     console.log(x)
    // }
    // test("lost")

    useEffect(()=>{
        if(reimbursement.employeeId){userService.getUserById(reimbursement.employeeId).then((response)=>{
            dispatch(getUser(response))
        })
        setAmount(reimbursement.amount)
        setCommentEmployee(reimbursement.commentEmployee)
        setCommentManager(reimbursement.commentManager)}
    },[reimbursement])

    return(<>
        <p className="p">ID: {reimbursement.id}</p>
        <p className="p">NAME: {`${user.fname} ${user.lname}`}</p>
        <p className="p">Employee ID: {reimbursement.employeeId}</p>
        <p className="p">Amount: <input className="input" onChange={handleChangeAmount} type="text" id="Amount" value={amount}/></p>
        <p className="p">Status: {reimbursement.status}</p>

        {
        isManager === false ?
        <p className="p">Employee Comment: <input className="input" onChange={handleCommentEmployee} type="text" id="Employee Comment" value={commentEmployee}/></p> :
        <p className="p">Employee Comment: <input className="input" type="text" id="Employee Comment" value={commentEmployee}/></p>
        }

        {
        isManager === true ?
        <p className="p">Manager Comment: <input className="input" onChange={handleCommentManager} type="text" id="Manager Comment" value={commentManager}/></p> :
        <p className="p">Manager Comment: <input className="input" type="text" id="Manager Comment" value={commentManager}/></p>
        }
        {
        
        isManager === true && matchId !== reimbursement.employeeId ?
        <>
            <button className="button" onClick={()=>changeStatus("Approved")}>Approve</button>
            <button className="button" onClick={()=>changeStatus("Denied")}>Deny</button> 
        </>:
            null
        }
        <button className="button" onClick={saveChanges}>Save</button>
    </>)
}