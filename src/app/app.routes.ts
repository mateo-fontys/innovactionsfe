import { Routes } from '@angular/router';
import { TaskCreationComponent } from './pages/creator/taskCreation/taskCreation.component';
import { LoginComponent } from './pages/login/login.component';
import { TaskHomeComponent } from './pages/creator/taskHome/taskHome.component';
import { BugReportFormComponent } from './bug-report-form/bug-report-form.component';
import { PaymentComponent } from '../app/payment/payment.component'
import { PayoutComponent } from './payout/payout.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'task-creation', component: TaskCreationComponent },
  { path: 'task-home', component: TaskHomeComponent },
  { path: 'report', component: BugReportFormComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'payout', component: PayoutComponent }
];
