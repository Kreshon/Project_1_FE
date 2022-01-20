import { Reimbursement } from "../entities/reimbursement";
import { User } from "../entities/user";
import reimbursementService from '../service/reimbursement-service';
import React,{ useState , useEffect, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import userService from "../service/user-service";
import { getUser, getReimbursement, updateReimbursement, getAllReimbursements } from "../store/actions";



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
        userService.getUserById(reimbursement.employeeId).then((response)=>{
            dispatch(getUser(response))
        })
        setAmount(reimbursement.amount)
        setCommentEmployee(reimbursement.commentEmployee)
        setCommentManager(reimbursement.commentManager)
    },[reimbursement])

    return(<>
        <p>ID: {reimbursement.id}</p>
        <p>NAME: {`${user.fname} ${user.lname}`}</p>
        <p>Employee ID: {reimbursement.employeeId}</p>
        <p>Amount: <input onChange={handleChangeAmount} type="text" id="Amount" value={amount}/></p>
        <p>Status: {reimbursement.status}</p>
        <p>Employee Comment: <input onChange={handleCommentEmployee} type="text" id="Employee Comment" value={commentEmployee}/></p>
        <p>Manager Comment: <input onChange={handleCommentManager} type="text" id="Manager Comment" value={commentManager}/></p>
        <button onClick={()=>changeStatus("Approved")}>Approve</button>
        <button onClick={()=>changeStatus("Denied")}>Deny</button>
        
        
        <button onClick={saveChanges}>Save</button>
    </>)
}