import axios from 'axios';
import { Reimbursement } from '../entities/reimbursement'
import winston from 'winston'
import logConfig from '../../utils/logger'

class ReimbursementService {

    private URI: string;
    constructor (){
        this.URI = 'https://project1kreshon.azurewebsites.net/'
    }
    
    getAllReimbursements(): Promise<Reimbursement[]> {
        logger.info("Get all reimbursements called")
        return axios
            .get(this.URI + `reimbursements`)
                .then(result => result.data)
                    .catch(error => {console.log(error)});
    }

    createReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
        logger.info("Create reimbursement called")
        return axios
            .post(this.URI + `reimbursements`, reimbursement)
                .then(result => result.data)
                    .catch(error => {console.log(error)});
    }

    getReimbursementById(reimbursementId: string): Promise<Reimbursement> {
        logger.info("Get reimbursement by ID called")
        return axios
            .get(this.URI + `reimbursements/${reimbursementId}`)
                .then(result => result.data)
                    .catch(error => {console.log(error)});
    }

    updateReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
        logger.info("Update reimbursement called")
        return axios
            .put(this.URI + `reimbursements/:id`, reimbursement)
                .then(result => result.data)
                    .catch(error => {console.log(error)});
    }

}

const logger = winston.createLogger(logConfig);
const reimbursementService = new ReimbursementService();
export default reimbursementService;