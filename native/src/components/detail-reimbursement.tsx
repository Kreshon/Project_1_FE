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
import AsyncStorage from '@react-native-async-storage/async-storage';


interface DetailReimbursementProps {
    reimbursement: Reimbursement;
    user: User;
}

export default function DetailReimbursement(props){
    const navigate = useNavigation()

    const {id} = useParams()
    const reimbursement = props.route.params.reimbursement;
    const user = props.route.params.user;
    const loggedUser = props.route.params.loggedUser;
    const dispatch = useDispatch()


    let isManager
    if(AsyncStorage.getItem("isManager")){isManager = AsyncStorage.getItem("isManager")}
    if(isManager === "true"){
        isManager = true;
    }else{
        isManager = false;
    }

    let matchId
    if(AsyncStorage.getItem("id")){matchId = AsyncStorage.getItem("id")}

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

    useEffect(()=>{
        if(reimbursement.employeeId){userService.getUserById(reimbursement.employeeId).then((response)=>{
            dispatch(getUser(response))
        })
        setAmount(reimbursement.amount)
        setCommentEmployee(reimbursement.commentEmployee)
        setCommentManager(reimbursement.commentManager)}
    },[reimbursement])

    return(<>
    <View style={styles.detail}>
        <Text style={styles.p}>Reimbursement ID: </Text>
        <Text style={styles.p2}> {reimbursement.id}</Text>
        <Text style={styles.p}>NAME: </Text>
        <Text style={styles.p2}>{`${user.fname} ${user.lname}`}</Text>
        <Text style={styles.p}>Employee ID: </Text>
        <Text style={styles.p2}>{reimbursement.employeeId}</Text>
        <Text style={styles.p}>Amount: </Text>
        <TextInput style={styles.input} value={amount} onChangeText={(value)=>handleChangeAmount(value)}/>
        <Text style={styles.p2}>Status: {reimbursement.status}</Text>
        <Text style={styles.p}>Employee Comment: </Text>
        
        {
        loggedUser.isManager === false || loggedUser.id === reimbursement.employeeId ?
        <TextInput style={styles.input} onChangeText={(value)=>setCommentEmployee(value)} value={commentEmployee}/> :
        <TextInput style={styles.input} value={commentEmployee}/>
        }
        <Text style={styles.p}>Manager Comment: </Text>
        {
        loggedUser.isManager === true && loggedUser.id !== reimbursement.employeeId ?
        <TextInput style={styles.input} onChangeText={(value)=>setCommentManager(value)} value={commentManager}/> :
        <TextInput style={styles.input} value={commentManager}/>
        }
        {
        
        loggedUser.isManager === true && loggedUser.id !== reimbursement.employeeId ?
        <>
            <Pressable onPress={()=>changeStatus("Approved")}>
                <Text style={styles.buttonA}>
                    Approve
                </Text>
            </Pressable>
            <Pressable onPress={()=>changeStatus("Denied")}>
                <Text style={styles.buttonB}>
                    Deny
                </Text>
            </Pressable>
        </>:
            null
        }
        <Pressable onPress={saveChanges}>
            <Text style={styles.button}>
                Save
            </Text>
        </Pressable>
    </View>
    </>)
}