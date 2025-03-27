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
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card: StripeCardElement | null = null;

  amount: number = 5000;


  async ngOnInit(): Promise<void> {
    this.stripe = await loadStripe('pk_test_51R3cJuGhJZbsy2ABv0DEcpfLR0fYkSfNOG9tZZdEAuIRhzI8WLF0ogRbAqvZwkKaWpARRja7kyJpmWX9XII2g4G100e4FlPH8L');  // Replace with your public Stripe key
  
    
      this.elements = this.stripe ? this.stripe.elements() : null;

      if (this.elements) {
        this.card = this.elements.create('card');
        this.card.mount('#card-element');
      }
  };
  


  async submitPayout(): Promise<void> {
    const {token, error}: TokenResult = await this.stripe!.createToken(this.card!);
    const tokenId = token?.id;
    
    const result = await PaymentService.withdraw(this.amount, tokenId!);

    if (result.error) {
      console.error('Payment failed:', result.error);
    } else {
      console.log('Payout successful!', result);
    }
  }
}

