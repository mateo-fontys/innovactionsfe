import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-payment',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})

export class PaymentComponent {
  amount: number = 500;
  currency: string = 'usd';

  constructor(private http: HttpClient) {}

  sendPayment() {
    const payload = { amount: this.amount, currency: this.currency };
    this.http.post('http://localhost:8080/payment/create', payload).subscribe(response => {
      console.log(response)
    });
  } 
}
