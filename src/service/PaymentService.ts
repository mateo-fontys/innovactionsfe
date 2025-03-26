import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

async function createCardToken(cardDetails: any) {
        const stripe = await loadStripe('pk_test_51R3cJuGhJZbsy2ABv0DEcpfLR0fYkSfNOG9tZZdEAuIRhzI8WLF0ogRbAqvZwkKaWpARRja7kyJpmWX9XII2g4G100e4FlPH8L');  // Replace with your public Stripe key

        if (!stripe) {
            console.error('Stripe has not loaded correctly.');
            return null;
        }

        const { token, error } = await stripe.createToken(cardDetails);

        if (error) {
            console.error('Error creating token:', error);
            return null;
        }

        return token!.id;
 
}

async function deposit(amount: number, currency: string){

    const response = await axios.post('http://localhost:8080/payment/deposit', {
        amount: amount,
        currency: currency
    });

    return response.data;
}

async function withdraw(amount: number, cardDetails: any){

    const tokenId = await createCardToken(cardDetails);

    if(tokenId){
        const response = await axios.post('http://localhost:8080/payment/withdraw', {
            amount: amount,
            tokenId: tokenId
        });
    
        return response.data;
    }
}

export const PaymentService = {
    deposit,
    withdraw
}