import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksService } from '../shared/TasksService';
import { CommonModule } from '@angular/common';
import UserService from '../../users/shared/UserService';

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

  constructor(private router: Router, private tasksService: TasksService) {}

  title: string = '';
  budget: number = 2500;
  link: string = '';
  description: string = '';

  onTaskAbort() {
    this.router.navigate(['/task-home']);
  }

  onTaskCreation() {
    const body = {
      title: this.title,
      budget: this.budget,
      link: this.link,
      description: this.description,
      payout: 0,
      creator:{
      
      id: 1,
      username: 'Bob',           
      virtualMoney: 100 
      }
    };

    TasksService.CreateTask(body, this.router);

    UserService.decreaseVirtualMoney(1, this.budgetValue);
    this.tasksService.createTask(body); 
  }
}


