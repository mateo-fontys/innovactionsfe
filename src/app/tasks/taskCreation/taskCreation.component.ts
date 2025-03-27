import { Component } from '@angular/core';
import { NgbdDatepickerMultiple } from "../../utilities/dateTimePicker/dateTimePicker";
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';
import TasksService from '../shared/TasksService';
import { CommonModule } from '@angular/common';

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

  title: string = ''
  budgetValue: number = 2500;
  link: string = '';
  description: string = '';

  onTaskAbort(){
    this.router.navigate(['/task-home']);
  }

  onTaskCreation() {

    const body = {
      title: this.title,
      budget: this.budgetValue,
      link: this.link,
      description: this.description
    };

    TasksService.CreateTask(body, this.router);
    
  }
}