import {  Routes } from '@angular/router';
import { PaymentComponent } from '../app/payment/payment.component'
import { PayoutComponent } from './payout/payout.component';

export const routes: Routes = [
  { path: 'payment', component: PaymentComponent },
  { path: 'payout', component: PayoutComponent }
];

