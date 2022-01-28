import axios from 'axios';
import { User } from '../entities/user'

class UserService {

    private URI: string;
    constructor (){
        this.URI = "http://e7e7-2601-540-8200-a080-955f-f2b5-dfa2-d5dd.ngrok.io/" //'http://localhost:4444/'
    }

    login(loginPayload): Promise<User> {
        console.log(loginPayload)
        return axios
            .patch(this.URI + `login`, loginPayload)
                .then(result => result.data)
                    .catch(error => {console.log(error)});
    }

    getAllUsers(): Promise<User[]> {
        return axios
            .get(this.URI + `users`)
                .then(result => result.data)
                    .catch(error => {console.log(error)});
    }

    createUser(user: User): Promise<User> {
        return axios
            .post(this.URI + `users`, user)
                .then(result => result.data)
                    .catch(error => {console.log(error)});
    }

    getUserById(userId: string): Promise<User> {
        console.log(userId)
        return axios
            .get(this.URI + `users/${userId}`)
                .then(result => result.data)
                    .catch(error => {console.log(error)});
    }

    updateUser(user: User): Promise<User> {
        return axios
            .put(this.URI + `users/:id`, user)
                .then(result => result.data)
                    .catch(error => {console.log(error)});
    }

}
const userService = new UserService();
export default userService;