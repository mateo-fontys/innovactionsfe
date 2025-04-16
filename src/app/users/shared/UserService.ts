import axios from 'axios';
import { environment }  from '../../../environments/environment'

async function getUsers() {

    const response = await axios.get(`${environment.apiUrl}/users/1`);
}

async function increaseVirtualMoney(userId: number,amount: number) {
    const response = await axios.put(`${environment.apiUrl}/users/${userId}/increase/virtual-money?amount=${amount}`);
}


async function decreaseVirtualMoney(userId: number,amount: number) {
    const response = await axios.put(`${environment.apiUrl}/users/${userId}/decrease/virtual-money?amount=${amount}`);
}


 const UserService = {
    getUsers,
    increaseVirtualMoney,
    decreaseVirtualMoney
}
export default UserService;