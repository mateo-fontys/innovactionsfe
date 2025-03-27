import { Component, OnInit } from '@angular/core';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../shared/PaymentService';

@Component({
  selector: 'app-payment',
  imports: [CommonModule, FormsModule], 
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit {

  
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card: any;
  amount: number = 500;
  currency: string = 'usd';

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51R3cJuGhJZbsy2ABv0DEcpfLR0fYkSfNOG9tZZdEAuIRhzI8WLF0ogRbAqvZwkKaWpARRja7kyJpmWX9XII2g4G100e4FlPH8L');  // Replace with your public Stripe key

    this.elements = this.stripe ? this.stripe.elements() : null;

    if (this.elements) {
      this.card = this.elements.create('card');
      this.card.mount('#card-element');
    }
  }

  async sendPayment() {
    if (!this.stripe || !this.elements || !this.card) {
      return;
    }
    const { clientSecret } = await PaymentService.deposit(this.amount, this.currency);
    console.log(clientSecret)

        const { error, paymentIntent } = await this.stripe!.confirmCardPayment(clientSecret, {
          payment_method: {
            card: this.card,
          },
        });

        if (error) {
          console.error(error);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
          console.log('Payment successful!');
        }
    
  }
}