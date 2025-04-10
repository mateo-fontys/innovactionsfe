import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from '../shared/TaskModel';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private apiUrl = `${environment.apiUrl}/api/tasks`;

  constructor(private http: HttpClient, private router: Router) {}

  createTask(body: Task): void {
    this.http.post<Task>(this.apiUrl, body).subscribe({
      next: (response) => {
        console.log('Task created successfully:', response);
        this.router.navigate(['/task-home']);
      },
      error: (error) => {
        console.error('Error creating task:', error);
      },
    });
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  updateTask(id: string, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }
}

