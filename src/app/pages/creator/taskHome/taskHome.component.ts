import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-home',
  standalone: true,
  templateUrl: './taskHome.component.html',
  styleUrls: ['./taskHome.component.css']
})
export class TaskHomeComponent {
  constructor(private router: Router) {}

  navigateToCreate() {
    this.router.navigate(['/task-creation']); // Adjust this path according to your routing configuration
  }
}