import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TasksService } from '../shared/TasksService';
import { Task } from '../shared/TaskModel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-home',
  standalone: true,
  templateUrl: './taskHome.component.html',
  styleUrls: ['./taskHome.component.css'],
  imports: [CommonModule]
})
export class TaskHomeComponent implements OnInit {
  tasks: Task[] = [];
  isLoading: boolean = true;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {
    this.fetchTasks();

    this.subscriptions.add(
      this.tasksService.tasksRefresh$.subscribe(() => {
        this.fetchTasks();
      })
    );

  }

  fetchTasks() {
    const creatorId = 1;
    this.isLoading = true;

    this.tasksService.getTasksFromCreator(creatorId).subscribe({
      next: (data) => {
        // console.log('Before sorting:', data);
        this.tasks = [...data.sort((a, b) => Number(b.id) - Number(a.id))]; 
        
    console.log(data) // Sort in descending order
        // console.log('Sorted tasks in descending order:', this.tasks);
        this.isLoading = false;
      },
      
      error: (error) => {
        console.error('Error fetching tasks:', error);
        this.isLoading = false;
      }
    });
  }  

  navigateToCreate() {
    this.router.navigate(['/task-creation']);
  }

  navigateToUpdate(taskId: string): void {
    this.router.navigate(['/update-task', taskId]);
  }

  navigateToReportPage(task: Task) {
    this.router.navigate(['/report'], { state: { task: task } });
  }
}

