import { Routes } from '@angular/router';
import { TaskCreationComponent } from './pages/creator/taskCreation/taskCreation.component';
import { LoginComponent } from './pages/login/login.component';
import { TaskHomeComponent } from './pages/creator/taskHome/taskHome.component';
import { BugReportFormComponent } from './bug-report-form/bug-report-form.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'task-creation', component: TaskCreationComponent },
    { path: 'task-home', component: TaskHomeComponent },
    { path: 'report', component: BugReportFormComponent }
];
