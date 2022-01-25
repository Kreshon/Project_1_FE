import { Reimbursement } from "../entities/reimbursement";
import { User } from "../entities/user";
import reimbursementService from '../service/reimbursement-service';
import React,{ useState , useEffect, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import userService from "../service/user-service";
import { getUser, getReimbursement, updateReimbursement, getAllReimbursements } from "../store/actions";
import { TextInput, View, Text, Pressable } from "react-native";
import styles from "../../company-style"
import { useNavigation } from "@react-navigation/native";


interface DetailReimbursementProps {
    reimbursement: Reimbursement;
    user: User;
}

export default function DetailReimbursement(props){
    console.log(props.route.params)
    const navigate = useNavigation()

    const {id} = useParams()
    const reimbursement = props.route.params.reimbursement;
    const user = props.route.params.user;
    console.log(user)   
    const loggedUser = props.route.params.loggedUser;
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
        
        navigate.goBack()
    }

    function changeStatus(reviewedStatus: string){
        const updatedReimbursement = {...reimbursement}
        updatedReimbursement.status = reviewedStatus;
        reimbursementService.updateReimbursement(updatedReimbursement).then((response)=>{
            reimbursementService.getAllReimbursements().then((response)=>{
                dispatch(getAllReimbursements(response))})})
        
        navigate.goBack()
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
    <View>
        <Text style={styles.p}>ID: {reimbursement.id}</Text>
        <Text style={styles.p}>NAME: {`${user.fname} ${user.lname}`}</Text>
        <Text style={styles.p}>Employee ID: {reimbursement.employeeId}</Text>
        <View><Text style={styles.p}>Amount: </Text><TextInput style={styles.input} value={amount} onChangeText={(value)=>handleChangeAmount(value)}/></View>
        <Text style={styles.p}>Status: {reimbursement.status}</Text>

        {
        loggedUser.isManager === false || loggedUser.id === reimbursement.employeeId ?
        <View><Text style={styles.p}>Employee Comment: </Text><TextInput style={styles.input} onChangeText={(value)=>setCommentEmployee(value)} value={commentEmployee}/></View> :
        <View><Text style={styles.p}>Employee Comment: </Text><TextInput style={styles.input} value={commentEmployee}/></View>
        }

        {
        loggedUser.isManager === true && loggedUser.id !== reimbursement.employeeId ?
        <View><Text style={styles.p}>Manager Comment: </Text><TextInput style={styles.input} onChangeText={(value)=>setCommentManager(value)} value={commentManager}/></View> :
        <View><Text style={styles.p}>Manager Comment: </Text><TextInput style={styles.input} value={commentManager}/></View>
        }
        {
        
        loggedUser.isManager === true && loggedUser.id !== reimbursement.employeeId ?
        <>
            <Pressable style={styles.button} onPress={()=>changeStatus("Approved")}>
                <Text>
                    Approve
                </Text>
            </Pressable>
            <Pressable style={styles.button} onPress={()=>changeStatus("Denied")}>
                <Text>
                    Deny
                </Text>
            </Pressable>
        </>:
            null
        }
        <Pressable style={styles.button} onPress={saveChanges}>
            <Text>
                Save
            </Text>
        </Pressable>
    </View>
    </>)
}