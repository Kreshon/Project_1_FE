import React,{ useState , useEffect, useRef } from "react";
import { Reimbursement } from "../entities/reimbursement";
import { User } from "../entities/user";

interface ReimbursementListProps{
    reimbursements: Reimbursement[];
    users: User[];
}

export default function ReimbursementList(props:ReimbursementListProps){

    const reimbursements = props.reimbursements;
    console.log(reimbursements);
    const users = props.users;

    
    const reimbursementList = reimbursements.map(reimbursement => {
        const currentUser = users.find(user=>user.id===reimbursement.employeeId);
        return (<p>
        ID: {`${reimbursement.id} `}
        name: {`${currentUser.fname} ${currentUser.lname} `}
        employeeID: {`${reimbursement.employeeId} `}
        amount: {`${reimbursement.amount} `}
        status: {`${reimbursement.status} `}
        Employee comment: {`${reimbursement.commentEmployee} `}
        Manager comment: {`${reimbursement.commentManager} `}
        </p>)})
    
    return(<>
        <h1>In development, check back later</h1>
        {reimbursementList}
    </>)
}