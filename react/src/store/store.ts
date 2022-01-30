import { createStore } from "@reduxjs/toolkit";
import { User } from '../entities/user'
import { Reimbursement } from '../entities/reimbursement'
import reducer from './reducer';


export interface UserState{
    users:User[];
    user:User;
}

export interface ReimbursementState{
    reimbursements:Reimbursement[];
    reimbursement:Reimbursement;
}

export interface AppState extends UserState,ReimbursementState{

}

export const store = createStore(reducer)