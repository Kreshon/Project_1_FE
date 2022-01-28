import React, { useState, useEffect, useRef, useMemo } from "react";
import { Reimbursement } from "../entities/reimbursement";
import { User } from "../entities/user";
import { useTable } from "react-table";
import { useParams, useNavigate } from 'react-router-dom';
import { getAllReimbursements, getAllUsers, updateLoggedUser } from "../store/actions";
import { TextInput, View, Text, Pressable, ScrollView } from "react-native";
import styles from "../../company-style";
import { useNavigation } from "@react-navigation/native";
import { Card } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import reimbursementService from "../service/reimbursement-service";
import { useDispatch, useSelector } from "react-redux";
import userService from "../service/user-service";
import { AppState } from "../store/store";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ReimbursementListProps {
  reimbursements: Reimbursement[];
  users: User[];
}

export default function ReimbursementList(props: ReimbursementListProps) {
  
  const dispatch = useDispatch()
  const navigate = useNavigation()
  const users = useSelector((state: AppState) => state.users);
  const unfilteredReimbursements = useSelector((state: AppState) => state.reimbursements)
  const loggedUser = useSelector((state: AppState) => state.loggedUser)
  
  const [userId, setUserId] = useState("");
  (async ()=> (await AsyncStorage.getItem("id").then(response => setUserId(response))))()
//   const getUserId = async ()=> {const returnId = await AsyncStorage.getItem("id")
// return returnId}

  const [isManagerString, setIsManagerString] = useState("");
  const [isManager, setIsManager] = useState(false);
  (async ()=> (await AsyncStorage.getItem("isManager").then(response => setIsManagerString(response))))();
  // if(isManagerString === "true"){
  //     setIsManager(true);
  // }else{
  //     setIsManager(false);
  // }
  (async()=> {console.log(await AsyncStorage.getItem("id"))})()
  console.log(userId)
  let reimbursements = (isManagerString === "true") ?
  unfilteredReimbursements :
  unfilteredReimbursements.filter(reimbursement =>  userId === reimbursement.employeeId)



  useEffect(()=> {
    reimbursementService.getAllReimbursements().then(response => dispatch(getAllReimbursements(response)))
    userService.getAllUsers().then(response => dispatch(getAllUsers(response)))
  },[])

  const keyExtractor = (item: object, index: number) => {
    return index.toString();
  };

  // let reimbursements = []
  // console.log(unfilteredReimbursements)
  // if(unfilteredReimbursements && loggedUser){reimbursements = (loggedUser.isManager) ?
  // unfilteredReimbursements :
  // unfilteredReimbursements.filter(reimbursement => loggedUser.id === reimbursement.employeeId)}
  
  console.log(reimbursements)

  function handleReimbursementSelect(index){
    console.log(index)
    navigate.navigate("Detail", {reimbursement:reimbursements[index], user:users[users.findIndex(user=>user.id === reimbursements[index].employeeId)],loggedUser:loggedUser})
  }

  const reimbursementCard = (params: any) =>{
    console.log(params)
    return(
      <Pressable onPress={()=>handleReimbursementSelect(params.index)}>
        <Card>
          <Text>
            ID {params.item.id}
          </Text>
          <Text>
            Name {params.item.name}
          </Text>
          <Text>
            Amount {params.item.amount}
          </Text>
          <Text>
            Status {params.item.status}
          </Text>
        </Card>
      </Pressable>
    )}

  function combineUserToReimbursement(// adding employee names to the list of reimbs
    users: User[],
    reimbursements: Reimbursement[]
  ) {
    let reimbursementList: { name: string; id: string; employeeId: string; amount: number; status: string; commentEmployee: string; commentManager: string; file?: string | undefined; }[] = [];// 35 creating an empty aray called reimbursement list
    reimbursements.map((reimbursement) => {// 36 goes through existing list of reimbs
      const currentUser = users.find(// 37,38 finding the user that has an ID that matches the Employee ID on the current reimb
        (user) => user.id === reimbursement.employeeId
      );
      reimbursementList.push({// 40,41,42, adds reimbs information and the name of the employee into the reimb array 
        ...reimbursement,
        name: `${currentUser?.fname} ${currentUser?.lname}`,
      });
    });
    return reimbursementList;
  }

  if(reimbursements && users){
    reimbursements = combineUserToReimbursement(users, reimbursements)
  }

  return (
  <ScrollView>
    {reimbursements ? <FlatList data={reimbursements}  renderItem={reimbursementCard} keyExtractor={keyExtractor}/> : <Text>Loading...</Text>}
  </ScrollView>
    );
}


