import { User } from '../entities/user'
import { Reimbursement } from '../entities/reimbursement'
import * as Actions from './actions'
import { AppState } from './store'

const initialState:AppState ={
    users: [],
    user: {fname: "",
        lname: "",
        id: "",
        username: "",
        password: "",
        isManager: false,
    },
    reimbursements: [],
    reimbursement: {
        id: "",
        employeeId: "",
        amount: 0,
        status: "",
        commentEmployee: "",
        commentManager: "",
    }
}

const reducer = (
    state:AppState=initialState,
    action:Actions.AppAction,
):AppState => {
    const newState={...state};
    console.log(action)
    switch(action.type){

        case Actions.UserActions.GetAllUsers:
            newState.users=action.payload as User[];
            return newState;
        case Actions.UserActions.GetUser:
            newState.user=action.payload as User;
            return newState;
        case Actions.UserActions.UpdateUser:
            newState.user=action.payload as User;
            return newState;

        case Actions.ReimbursementActions.GetAllReimbursements:
            newState.reimbursements=action.payload as Reimbursement[];
            return newState;
        case Actions.ReimbursementActions.GetReimbursement:
            newState.reimbursement=action.payload as Reimbursement;
            return newState;
        case Actions.ReimbursementActions.UpdateReimbursement:
            newState.reimbursement=action.payload as Reimbursement;
            return newState;

        default: return state;
    
    }
}

export default reducer