import React, { useState, useEffect, useRef} from "react";
import { Reimbursement } from "../entities/reimbursement";
import { User } from "../entities/user";
import { useTable } from "react-table";
import { useParams, useNavigate } from 'react-router-dom'
import { getAllReimbursements } from "../store/actions";

interface StatsReimbursementProps {
    reimbursement: Reimbursement;
    user: User;
}

export default function Statistics(props: StatsReimbursementProps){

    

    return(<>
        <p></p>
    </>)
}