import { Routes } from '@angular/router';
import { BugReportFormComponent } from './bug-report-form/bug-report-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'report', pathMatch: 'full' },
  { path: 'report', component: BugReportFormComponent }
];
