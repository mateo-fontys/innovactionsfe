import { Routes } from '@angular/router';
import { TaskCreationComponent } from './tasks/taskCreation/taskCreation.component';
import { LoginComponent } from './users/login/login.component';
import { TaskHomeComponent } from './tasks/taskHome/taskHome.component';
import { BugReportFormComponent } from './tasks/bug-report-form/bug-report-form.component';
import { PaymentComponent } from './payments/payment/payment.component'
import { PayoutComponent } from './payments/payout/payout.component';
import { OverviewComponent } from './users/overview/overview.component';
import { AdminTaskApprovalComponent } from './pages/admin/taskOverview/taskOverview.component';
import { UpdateTaskComponent } from './tasks/taskUpdate/updateTask.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'task-creation', component: TaskCreationComponent },
  { path: 'task-home', component: TaskHomeComponent },
  { path: 'report', component: BugReportFormComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'payout', component: PayoutComponent },
  { path: 'user-overview', component: OverviewComponent },
  { path: 'admin-task-overview', component: AdminTaskApprovalComponent },
  { path: 'update-task/:id', component: UpdateTaskComponent}
];
