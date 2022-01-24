import {Link, useNavigate} from 'react-router-dom'
import { User } from "../entities/user";
import { Reimbursement } from "../entities/reimbursement";
import "../company-style.css"


export default function NavBar(){

    const navigate = useNavigate()

    let isManager
    if(sessionStorage.getItem("isManager")){isManager = sessionStorage.getItem("isManager")}
    if(isManager === "true"){
        isManager = true;
    }else{
        isManager = false;
    }

    let id
    if(sessionStorage.getItem("id")){id = sessionStorage.getItem("id")}

    function redirect(url: string){
        navigate(url) 
    }

    function handleLogout(){
        redirect("login");
        sessionStorage.clear();
    }
    return(<>
    <span className='nav'>        
        {
            //this is doing id !== undefined but is truthy instead of falsy
            id ?
            <button className="button" onClick={handleLogout}>Logout</button> :
            <button className="button" onClick={()=>redirect("login")}>Login</button> 
        }
        {
            id ?
            <button className="button" onClick={()=>redirect("reimbursements")}>Reimbursement List</button> :
            null
        }
        {
            isManager === true ? 
            <button className="button" onClick={()=>redirect("statistics")}>Statistics</button> :
            null            
            }
    </span>
    </>)
}