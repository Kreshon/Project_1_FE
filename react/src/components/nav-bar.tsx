import { useNavigate } from 'react-router-dom';
import "../company-style.css";
import winston from 'winston'
import logConfig from '../../utils/logger'

export default function NavBar(){

    const navigate = useNavigate()
    const logger = winston.createLogger(logConfig);
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
        logger.info(`Redirecting to ${url}`)
        navigate(url) 
    }

    function handleLogout(){
        logger.info("Redirecting to Logout")
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