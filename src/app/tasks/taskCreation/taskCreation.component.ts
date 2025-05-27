import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import TaskService from '../shared/tasks.service';
import { CommonModule } from '@angular/common';
import UserService from '../../users/shared/user.service';

@Component({
  selector: 'app-task-creation',
  standalone: true,
  templateUrl: './taskCreation.component.html',
  styleUrls: ['./taskCreation.component.css'],
  imports: [
    CommonModule,
    FormsModule
  ]
})


export class TaskCreationComponent {

  constructor(private router: Router) { }

  title: string = '';
  budget: number = 2500;
  link: string = '';
  description: string = '';
  difficulty: 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW';
  errorMessage: string = '';


  onTaskAbort() {
    this.router.navigate(['/task-home']);
  }

  async onTaskCreation() {
    try {
    this.errorMessage = '';

      const body = {
        title: this.title,
        budget: this.budget,
        link: this.link,
        description: this.description,
        payout: 0,
        difficulty: this.difficulty,
        creator: {
          id: 1,
          username: 'Bob',
          virtualMoney: 100,
        }
      };

      await TaskService.createTask(body);
      await UserService.decreaseVirtualMoney(1, this.budget);

      this.router.navigate(['/task-home']);
    } catch (err: any) {
      console.error('Task creation error:', err);
      if (err.response && err.response.status === 400) {
        const errorHeader = err.response.headers['error'];
        this.errorMessage = errorHeader || 'An unknown error occurred.';
        console.error('Task creation failed:', this.errorMessage);
      } else {
        this.errorMessage = 'Something went wrong!';
      }
    }

  }
}


