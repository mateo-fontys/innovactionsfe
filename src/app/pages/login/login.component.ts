import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-task-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) { }

  onSignIn() {
    this.router.navigate(['/task-home']); // Replace with your actual route
  }
}