import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

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
  amount: number = 500;  // Example amount
  currency: string = 'usd';  // Example currency

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    // Initialize Stripe
    this.stripe = await loadStripe('pk_test_51R3cJuGhJZbsy2ABv0DEcpfLR0fYkSfNOG9tZZdEAuIRhzI8WLF0ogRbAqvZwkKaWpARRja7kyJpmWX9XII2g4G100e4FlPH8L');  // Replace with your public Stripe key

    // Initialize Elements
    this.elements = this.stripe ? this.stripe.elements() : null;

    if (this.elements) {
      this.card = this.elements.create('card');
      this.card.mount('#card-element');  // Mount the card input element to a div
    }
  }

  async sendPayment() {
    if (!this.stripe || !this.elements || !this.card) {
      return;
    }

    // Get the payment details from your backend (you might need to modify this endpoint)
    this.http.post('http://localhost:8080/payment/create', { amount: this.amount, currency: this.currency })
      .subscribe(async (paymentIntentResponse: any) => {
        // Create payment method using the card details
        const { clientSecret } = paymentIntentResponse;

        // Confirm the card payment
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
      });
  }
}