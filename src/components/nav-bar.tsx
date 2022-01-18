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

    function redirect(url: string){
        navigate(url) 
    }

    return(<>
    <span>
        <button onClick={()=>redirect("login")}>Login</button>
        <button onClick={()=>redirect("reimbursements")}>Reimbursement List</button>
        {
            isManager === true ? 
            <button onClick={()=>redirect("statistics")}>Statistics</button> :
            null            
            }
            {/* logout is going to be similar to the above code but based off of session sotrage, instead of null put a button for logout, look into sessionstorage.clear for onClick */}
    </span>
    </>)
}