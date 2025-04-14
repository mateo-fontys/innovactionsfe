import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    // Simulate loading delay
    this.isLoading = true;
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Hardcoded tasks data
      this.tasks = [
        {
          id: 1,
          title: 'Complete Project Documentation',
          description: 'Write comprehensive documentation for the new feature set',
          status: 'Completed',
          dueDate: '2023-06-15',
          priority: 'High',
          image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
          id: 2,
          title: 'Design User Interface for Mobile App',
          description: 'Create wireframes and mockups for the new mobile application',
          status: 'InProgress',
          dueDate: '2023-06-20',
          priority: 'Medium',
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
          id: 3,
          title: 'Fix Authentication Bug',
          description: 'Resolve the issue with user authentication in the login flow',
          status: 'Pending',
          dueDate: '2023-06-18',
          priority: 'High',
          image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
          id: 4,
          title: 'Implement Payment Gateway',
          description: 'Integrate Stripe payment processing for subscription model',
          status: 'Pending',
          dueDate: '2023-06-25',
          priority: 'High',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
          id: 5,
          title: 'Optimize Database Queries',
          description: 'Improve performance of slow-running database operations',
          status: 'InProgress',
          dueDate: '2023-06-22',
          priority: 'Medium',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
          id: 6,
          title: 'Write Unit Tests',
          description: 'Create comprehensive test suite for core functionality',
          status: 'Completed',
          dueDate: '2023-06-10',
          priority: 'Low',
          image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        }
      ];
      
      this.isLoading = false;
    }, 1500); // Simulate a 1.5 second loading time
  }

  navigateToCreate() {
    this.router.navigate(['/task-creation']); // Adjust this path according to your routing configuration
  }
}