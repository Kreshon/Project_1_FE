import React, { useState, useEffect, useRef, useImperativeHandle} from "react";
import { Reimbursement } from "../entities/reimbursement";
import { User } from "../entities/user";
import { useTable } from "react-table";
import { useParams, useNavigate } from 'react-router-dom'
import { getAllReimbursements } from "../store/actions";
import "../company-style.css"

interface StatsReimbursementProps {
    reimbursements: Reimbursement[];
    users: User[];
}

export default function Statistics(props: StatsReimbursementProps){

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
                amount: 0,
                count: 0
            })

        })
        reimbursements.map((reimbursement) => {
        const index = userIdentifiersList.findIndex((user)=> reimbursement.employeeId === user.id)
            let addedTotal = Number(reimbursement.amount) + userIdentifiersList[index].amount;
            userIdentifiersList[index].amount = addedTotal
            // userIdentifiersList[index].amount += reimbursement.amount
            userIdentifiersList[index].count += 1;
        })

        return userIdentifiersList;
        
    }

    function reimbursementCounter(){
        let reimbursementCounterList = []
        users.map((user) => {
            
            reimbursementCounterList.push({
                name: `${user.fname} ${user.lname}`,
                id: user.id,
                amount: 0
            })

        })
        reimbursements.map((reimbursement) => {
        const index = reimbursementCounterList.findIndex((user)=> reimbursement.employeeId === user.id)
            reimbursementCounterList[index].amount += 1;
        })

        return reimbursementCounterList;
    }

    const displayAmountTotals = employeeSpendingTotal()

    const displayReimbursmentReqTotals = reimbursementCounter()
    

    return(<>

    {
        isManager === true ? 
        <>
        <h1 className="h1"><b>Statistics</b></h1> 
        <table className="table">
            <thead className="tHead">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Total Reimb. Req. Amount</th>
                    <th>Total Reimb. Req. Count</th>
                </tr>
            </thead>
            <tbody>
                {displayAmountTotals.map((userIdentifier)=>(
                    <tr>
                        <td className="tData">{userIdentifier.id}</td>
                        <td className="tData">{userIdentifier.name}</td>
                        <td className="tData">{userIdentifier.amount}</td>
                        <td className="tData">{userIdentifier.count}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
        :
        <h1 className="h1">Access Denied {">:("}</h1>           
        }
        
    </>)
}