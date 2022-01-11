import axios from 'axios';
import { User } from '../entities/user'

class UserService {

    private URI: string;
    constructor (){
        this.URI = 'http://localhost:4444/'
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

}
const userService = new UserService();
export default userService;