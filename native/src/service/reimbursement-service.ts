import axios from 'axios';
import { Reimbursement } from '../entities/reimbursement'

class ReimbursementService {

    private URI: string;
    constructor (){
        this.URI = "https://project1kreshon.azurewebsites.net/" //DONT FORGET SLASH AT THE END OF NGROK //'http://localhost:4444/'
    }

    getAllReimbursements(): Promise<Reimbursement[]> {
        return axios
            .get(this.URI + `reimbursements`)
                .then(result => result.data)
                    .catch(error => {console.log(error)});
    }

    createReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
        return axios
            .post(this.URI + `reimbursements`, reimbursement)
                .then(result => result.data)
                    .catch(error => {console.log(error)});
    }

    getReimbursementById(reimbursementId: string): Promise<Reimbursement> {
        return axios
            .get(this.URI + `reimbursements/${reimbursementId}`)
                .then(result => result.data)
                    .catch(error => {console.log(error)});
    }

    updateReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
        return axios
            .put(this.URI + `reimbursements/:id`, reimbursement)
                .then(result => result.data)
                    .catch(error => {console.log(error)});
    }

}

const reimbursementService = new ReimbursementService();
export default reimbursementService;