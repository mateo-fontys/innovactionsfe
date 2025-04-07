import { Component, OnInit, OnDestroy } from '@angular/core';
import { loadStripe, StripeElements, StripeCardElement, Stripe, TokenResult } from '@stripe/stripe-js';
import { PaymentService } from '../shared/PaymentService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payout',
  imports: [CommonModule, FormsModule],
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.css']
})


export class PayoutComponent implements OnInit {
  recipientEmail: string = '';
  amount: number = 5;


  async ngOnInit(): Promise<void> {

  };
  


  async submitPayout(): Promise<void> {
    const result = await PaymentService.withdraw(this.recipientEmail, this.amount);

    if (result.error) {
      console.error('Payment failed:', result.error);
    } else {
      console.log('Payout successful!', result);
    }
  }
}

