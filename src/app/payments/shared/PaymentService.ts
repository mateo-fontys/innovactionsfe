import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from  '../../../environments/environment';


async function deposit(amount: number, currency: string){

    const response = await axios.post(`${environment.apiUrl}/api/payment/deposit`, {
        amount: amount,
        currency: currency
    });

    return response.data;
}

async function withdraw(amount: number, tokenId: string){
    if(tokenId){
        const response = await axios.post(`${environment.apiUrl}/api/payment/withdraw`, {
            amount: amount,
            pay: tokenId
        });

        return response.data;
    }
}

export const PaymentService = {
    deposit,
    withdraw
}
