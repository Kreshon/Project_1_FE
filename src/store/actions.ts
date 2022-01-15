import { User } from '../entities/user'
import { Reimbursement } from '../entities/reimbursement'

export enum UserActions{
    GetAllUsers="GET_ALL_USERS",
    GetUser="GET_USER",
    UpdateUser="UPDATE_USER"
}

export enum ReimbursementActions{
    GetAllReimbursements="GET_ALL_REIMBURSEMENTS",
    GetReimbursement="GET_REIMBURSEMENT",
    UpdateReimbursement="UPDATE_REIMBURSEMENT"
}

export interface AppAction{
    type: string;
    payload: any;
}

export interface UserAction extends AppAction{
    type: UserActions;
    payload: User | User[];
}

export interface ReimbursementAction extends AppAction{
    type: ReimbursementActions;
    payload: Reimbursement | Reimbursement[];
}

export function getAllUsers(users:User[]):UserAction{
    const action:UserAction={
        type:UserActions.GetAllUsers,
        payload:users,
    }
    return action;
}

export function getUser(user:User):UserAction{
    const action:UserAction={
        type:UserActions.GetUser,
        payload:user,
    }
    return action;
}

export function updateUser(user:User):UserAction{
    const action:UserAction={
        type:UserActions.UpdateUser,
        payload:user,
    }
    return action;
}

export function getAllReimbursements(reimbursements:Reimbursement[]):ReimbursementAction{
    const action:ReimbursementAction={
        type:ReimbursementActions.GetAllReimbursements,
        payload:reimbursements,
    }
    return action;
}

export function getReimbursement(reimbursement:Reimbursement):ReimbursementAction{
    const action:ReimbursementAction={
        type:ReimbursementActions.GetReimbursement,
        payload:reimbursement,
    }
    return action;
}

export function updateReimbursement(reimbursement:Reimbursement):ReimbursementAction{
    const action:ReimbursementAction={
        type:ReimbursementActions.UpdateReimbursement,
        payload:reimbursement,
    }
    return action;
}