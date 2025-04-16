// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { Task } from '../shared/TaskModel';
// import axios from 'axios';
// import { environment } from '../../../environments/environment';

// @Injectable({
//   providedIn: 'root',
// })
// export class TasksService {
//   private apiUrl = `${environment.apiUrl}/api/tasks`;

//   constructor(private http: HttpClient, private router: Router) {}

//   createTask(body: Task): void {
//     this.http.post<Task>(this.apiUrl, body).subscribe({
//       next: (response) => {
//         console.log('Task created successfully:', response);
//         this.router.navigate(['/task-home']);
//       },
//       error: (error) => {
//         console.error('Error creating task:', error);
//       },
//     });
//   }

//   getTaskById(id: string): Observable<Task> {
//     return this.http.get<Task>(`${this.apiUrl}/${id}`);
//   }

//   updateTask(id: string, task: Task): Observable<Task> {
//     return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
//   }
// }



// function CreateTask(body: any, router: Router) {
//   console.dir(body);

//   axios
//     .post(`${environment.apiUrl}/api/tasks`, body)
//     .then((response) => {
//       if (response) {
//         console.log('Task created successfully');
//         console.log('response:');
//         console.dir(response);
//         router.navigate(['/task-home']); // Replace with your actual route
//       }
//     })
//     .catch((error) => {
//       console.log('error: ' + error);
//     });
// }

// async function GetTasksFromCreator(creatorId: number) {
//   try {
//     const response = await axios.get(
//       `${environment.apiUrl}/api/tasks/creator/${creatorId}/overview`
//     );
//     console.log(`Succesfully fetched tasks from creator ${creatorId}`);
//     console.log(response.data);

//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching tasks from creator ${creatorId} : `, error);
//     return null;
//   }
// }

// const TasksService = {
//   CreateTask,
//   GetTasksFromCreator,
// };

// export default TasksService;


// tasks.service.ts

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

  getTasksFromCreator(creatorId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/creator/${creatorId}/overview`);
  }
}

