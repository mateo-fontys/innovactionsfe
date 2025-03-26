import { Component } from '@angular/core';
import { PaymentService } from '../../service/PaymentService';

@Component({
  selector: 'app-payout',
  imports: [],
  templateUrl: './payout.component.html',
  styleUrl: './payout.component.css'
})
export class PayoutComponent {
  cardNumber: string = '';
  cardExpiry: string = '';
  cardCvc: string = '';
  amount: number = 5000;

  async submitPayout() {
    const cardDetails = {
      number: this.cardNumber,
      exp_month: parseInt(this.cardExpiry.split('/')[0]),
      exp_year: parseInt(this.cardExpiry.split('/')[1]),
      cvc: this.cardCvc
    };

    const result = await PaymentService.withdraw(this.amount, cardDetails);

    if (result.error) {
      console.error('Payment failed:', result.error);
    } else {
      console.log('Payout successful!', result);
    }
  }

}
