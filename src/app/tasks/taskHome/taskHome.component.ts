import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import TasksService from '../shared/TasksService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-home',
  standalone: true,
  templateUrl: './taskHome.component.html',
  styleUrls: ['./taskHome.component.css'],
  imports: [CommonModule]
})
export class TaskHomeComponent implements OnInit {
  tasks: any[] = [];
  isLoading: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.fetchTasks();  // Call fetchTasks when the component initializes
  }

  async fetchTasks() {
    const creatorId = 1;
    this.isLoading = true;
  
    try {
      // Fetch tasks from the service
      const data = await TasksService.GetTasksFromCreator(creatorId);
  
      // If the data is fetched successfully
      if (data && Array.isArray(data)) {
        this.tasks = data;  // Assign the fetched tasks to the component's tasks array
      } else {
        console.error('Unexpected data format:', data);
      }
    } catch (error) {
      // Handle the error if the fetch fails
      console.error('Error fetching tasks:', error);
    } finally {
      // Set loading status to false after data is fetched (or error occurs)
      this.isLoading = false;
    }
  }

  navigateToCreate() {
    this.router.navigate(['/task-creation']); // Adjust this path according to your routing configuration
  }
}
