import { Component, OnInit, OnDestroy } from '@angular/core';
import { loadStripe, StripeElements, StripeCardElement, Stripe, TokenResult } from '@stripe/stripe-js';
import { PaymentService } from '../shared/PaymentService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import UserService from '../../users/shared/UserService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payout',
  imports: [CommonModule, FormsModule],
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.css']
})


export class PayoutComponent {
  recipientEmail: string = '';
  amount: number = 5;
  currency: string = 'eur';
  constructor(private router: Router) {}
  
  limitDecimals(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
  
    if (value.includes('.')) {
      const [whole, decimal] = value.split('.');
      if (decimal.length > 2) {
        input.value = `${whole}.${decimal.slice(0, 2)}`;
        this.amount = parseFloat(input.value);
      }
    }
  }
  

  async submitPayout(): Promise<void> {
    const result = await PaymentService.withdraw(this.recipientEmail, this.amount, this.currency);

    if (result.error) {
      console.error('Payment failed:', result.error);
    } else {
      console.log('Payout successful!', result);
    }

    await UserService.decreaseVirtualMoney(1, this.amount);

    this.router.navigate(['/user-overview']); 
  }
}

