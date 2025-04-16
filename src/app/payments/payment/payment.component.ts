import { Component, OnInit } from '@angular/core';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../shared/PaymentService';
import UserService from '../../users/shared/UserService';

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
  amount: number = 50;
  currency: string = 'eur';
  
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

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51R3cJuGhJZbsy2ABv0DEcpfLR0fYkSfNOG9tZZdEAuIRhzI8WLF0ogRbAqvZwkKaWpARRja7kyJpmWX9XII2g4G100e4FlPH8L');  // Replace with your public Stripe key

    this.elements = this.stripe ? this.stripe.elements() : null;

    if (this.elements) {
      this.card = this.elements.create('card');
      this.card.mount('#card-element');
    }

    this.card.addEventListener('change', (event: any) => {
      const displayError = document.getElementById('card-errors');
      if (displayError) {
        if (event.error) {
          displayError.textContent = event.error.message;
        } else {
          displayError.textContent = '';
        }
      }
    });
  }

  async sendPayment() {
    if (!this.stripe || !this.elements || !this.card) {
      return;
    }
    const { clientSecret } = await PaymentService.deposit(this.amount, this.currency);

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

        await UserService.increaseVirtualMoney(1, this.amount);

  }
}
