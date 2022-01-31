import axios from 'axios';
import { User } from '../entities/user'
import winston from 'winston'
import logConfig from '../../utils/logger'

class UserService {

    private URI: string;
    constructor (){
        this.URI = 'https://project1kreshon.azurewebsites.net/'
    }
    
    login(loginPayload): Promise<User> {
        logger.info("Login req was called")
        return axios
            .patch(this.URI + `login`, loginPayload)
                .then(result => { console.log(result);return result.data})
                    .catch(error => {console.log(error)});
    }

    getAllUsers(): Promise<User[]> {
        logger.info("Get all users called")
        return axios
            .get(this.URI + `users`)
                .then(result => result.data)
                    .catch(error => {console.log(error)});
    }

    createUser(user: User): Promise<User> {
        logger.info("Create user called")
        return axios
            .post(this.URI + `users`, user)
                .then(result => result.data)
                    .catch(error => {console.log(error)});
    }

    getUserById(userId: string): Promise<User> {
        logger.info("Get user by ID called")
        return axios
            .get(this.URI + `users/${userId}`)
                .then(result => result.data)
                    .catch(error => {console.log(error)});
    }

    updateUser(user: User): Promise<User> {
        logger.info("Update user called")
        return axios
            .put(this.URI + `users/:id`, user)
                .then(result => result.data)
                    .catch(error => {console.log(error)});
    }

}

const logger = winston.createLogger(logConfig);
const userService = new UserService();
export default userService;