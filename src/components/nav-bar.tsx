import {Link, useNavigate} from 'react-router-dom'

export default function NavBar(){

    const navigate = useNavigate()

    let isManager
    if(sessionStorage.getItem("isManager")){isManager = sessionStorage.getItem("isManager")}
    if(isManager === "true"){
        isManager = true;
    }else{
        isManager = false;
    }
    console.log(isManager)
    console.log(isManager == true)
    function redirect(url: string){
        navigate(url) 
    }


    // can decide later if I want the button option or the link option, probably button
    return(<>
    <span>
        <Link to="login">Login</Link>
        <Link to="reimbursements">Reimbursement List</Link>
        <button onClick={()=>redirect("login")}>To Login</button>
        {
            isManager === true ? 
            <button onClick={()=>redirect("reimbursements")}>To Statistics</button> :
            null            
            }
    </span>
    </>)
}