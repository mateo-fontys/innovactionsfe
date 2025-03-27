import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { provideRouter } from '@angular/router';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { BugReportFormComponent } from './bug-report-form/bug-report-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule, BugReportFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'innovactions_frontend';
}