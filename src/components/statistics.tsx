import React, { useState, useEffect, useRef, useImperativeHandle} from "react";
import { Reimbursement } from "../entities/reimbursement";
import { User } from "../entities/user";
import { useTable } from "react-table";
import { useParams, useNavigate } from 'react-router-dom'
import { getAllReimbursements } from "../store/actions";

interface StatsReimbursementProps {
    reimbursements: Reimbursement[];
    users: User[];
}

export default function Statistics(props: StatsReimbursementProps){

    // what employee spends the most
    // avg of totals 
    // number of reimbursements per employee

    const users = props.users;
    const reimbursements = props.reimbursements;

    let isManager
    if(sessionStorage.getItem("isManager")){isManager = sessionStorage.getItem("isManager")}
    if(isManager === "true"){
        isManager = true;
    }else{
        isManager = false;
    }
    
    function employeeSpendingTotal(){
        // get users, add amount totals of reimbursements, show totals based on employee ID and name
        let userIdentifiersList = []
        users.map((user) => {
            
            userIdentifiersList.push({
                name: `${user.fname} ${user.lname}`,
                id: user.id,
                amount: 0
            })

        })
        reimbursements.map((reimbursement) => {
        const index = userIdentifiersList.findIndex((user)=> reimbursement.employeeId === user.id)
            let addedTotal = Number(reimbursement.amount) + userIdentifiersList[index].amount;
            userIdentifiersList[index].amount = addedTotal
            // userIdentifiersList[index].amount += reimbursement.amount
        })

        return userIdentifiersList;
        
    }

    const displayTotals = employeeSpendingTotal()
    

    return(<>

    {
        isManager === true ? 
        <>
        <p>Statistics</p> 
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {displayTotals.map((userIdentifier)=>(
                    <tr>
                        <td>{userIdentifier.id}</td>
                        <td>{userIdentifier.name}</td>
                        <td>{userIdentifier.amount}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
        :
        <h1>Access Denied {">:("}</h1>           
        }
        
    </>)
}