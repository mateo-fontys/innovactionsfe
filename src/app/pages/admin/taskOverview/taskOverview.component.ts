import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../tasks/shared/TasksService';
import { Task } from '../../../tasks/shared/TaskModel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-task-approval',
  standalone: true,
  templateUrl: './taskOverview.component.html',
  styleUrls: ['./taskOverview.component.css'],
  imports: [CommonModule, FormsModule]
})
export class AdminTaskApprovalComponent implements OnInit {
  tasks: Task[] = [];
  displayedTasks: Task[] = [];  // New property to store filtered/searched tasks
  isLoading: boolean = true;
  searchQuery = '';
  filterStatus: 'ALL' | 'PENDING' | 'ACCEPTED' | 'DECLINED' = 'ALL';

  private subscriptions: Subscription = new Subscription();

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.loadTasks();
    this.subscriptions.add(
      this.tasksService.tasksRefresh$.subscribe(() => {
        this.loadTasks();
      })
    );
  }

  loadTasks(): void {
    this.isLoading = true;
    this.tasksService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks = [...data];
        this.applyFilters(); // Apply any existing filters after loading
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
        this.isLoading = false;
      }
    });
  }

  approveTask(taskId: number): void {
    this.tasksService.approveTask(taskId).subscribe({
      next: () => {
        console.log('Task APPROVED successfully');
        this.refreshTasks();
      }
    })
    error: (error: string) => {
      console.error('Error approving task:', error);
    }
  }

  declineTask(taskId: number): void {
    this.tasksService.declineTask(taskId).subscribe({
      next: () => {
        console.log('Task DECLINED successfully');
        this.refreshTasks();
      }
    })
    error: (error: string) => {
      console.error('Error declining task:', error);
    }
  }

  refreshTasks(): void {
    this.loadTasks();
  }

  filterByStatus(status: 'ALL' | 'PENDING' | 'ACCEPTED' | 'DECLINED'): void {
    this.filterStatus = status;
    this.applyFilters();
  }

  searchTasks(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    // Start with all tasks
    let filtered = [...this.tasks];

    // Apply status filter
    if (this.filterStatus !== 'ALL') {
      filtered = filtered.filter(task => task.status === this.filterStatus);
    }

    // Apply search filter
    if (this.searchQuery.trim() !== '') {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query)
      );
    }

    // Update the displayed tasks
    this.displayedTasks = filtered;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}