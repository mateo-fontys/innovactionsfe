// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { TasksService } from '../shared/TasksService';
// import { Task } from '../shared/TaskModel';

// @Component({
//   selector: 'app-update-task',
//   templateUrl: './updateTask.component.html',
// })
// export class UpdateTaskComponent implements OnInit {
//   taskForm!: FormGroup;
//   taskId!: string;

//   constructor(
//     private fb: FormBuilder,
//     private taskService: TasksService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.taskId = this.route.snapshot.paramMap.get('id')!;
//     this.taskForm = this.fb.group({
//       title: ['', Validators.required],
//       description: [''],
//       status: ['pending', Validators.required],
//       dueDate: ['', Validators.required],
//     });

//     this.taskService.getTaskById(this.taskId).subscribe({
//       next: (task) => {
//         this.taskForm.patchValue(task);
//       },
//       error: (err) => {
//         console.error('Error loading task', err);
//       },
//     });
//   }

//   onSubmit(): void {
//     if (this.taskForm.valid) {
//       const updatedTask: Task = this.taskForm.value;
//       this.taskService.updateTask(this.taskId, updatedTask).subscribe({
//         next: () => {
//           console.log('Task updated successfully');
//           this.router.navigate(['/task-home']);
//         },
//         error: (err) => {
//           console.error('Error updating task', err);
//         },
//       });
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import TaskService from '../shared/tasks.service';
import { Task } from '../shared/task.model';

@Component({
  selector: 'app-update-task',
  standalone: true,
  templateUrl: './updateTask.component.html',
  styleUrls: ['./updateTask.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class UpdateTaskComponent implements OnInit {
  taskForm!: FormGroup;
  taskId!: string;
  isLoading: boolean = true;
  errorMessage: string = '';
  originalTask: any = null;
  
  difficultyOptions = ['HIGH', 'MEDIUM', 'LOW'];
  statusOptions = ['ACCEPTED', 'PENDING', 'DECLINED', 'DEACTIVATED'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.initForm();
    
    // Get the task ID from the route
    this.taskId = this.route.snapshot.paramMap.get('id')!;
    console.log('Task ID from route:', this.taskId);
    
    if (!this.taskId) {
      this.errorMessage = 'No task ID provided';
      this.isLoading = false;
      return;
    }
    
    // Fetch the task data using the new approach
    this.loadTaskFromAllTasks();
  }

  initForm(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      payout: [0, [Validators.required, Validators.min(0)]],
      budget: [0, [Validators.required, Validators.min(0)]],
      link: [''],
      difficulty: ['MEDIUM', Validators.required],
      status: ['PENDING']
    });
  }

  loadTaskFromAllTasks(): void {
    this.isLoading = true;
    this.errorMessage = '';
    console.log('Fetching all tasks to find task with ID:', this.taskId);
    
    // First try to get tasks from creator (if that's available)
    TaskService.getTasksFromCreator(1) // Assuming creator ID is 1
      .then((response) => {
        if (response && response.tasks && response.tasks.length > 0) {
          this.processTasksList(response.tasks);
        } else {
          // If no tasks from creator, try getting all tasks
          return TaskService.getAllTasks();
        }
      })
      .then((response) => {
        if (response && !this.originalTask) {
          // Only process if we haven't found the task yet
          this.processTasksList(response);
        }
      })
      .catch((error) => {
        console.error('Error loading tasks', error);
        this.errorMessage = 'Error loading tasks. Please try again.';
        this.isLoading = false;
      });
  }

  processTasksList(tasksResponse: any): void {
    console.log('Processing tasks list:', tasksResponse);
    
    // Handle different response formats
    let tasks = [];
    if (Array.isArray(tasksResponse)) {
      tasks = tasksResponse;
    } else if (tasksResponse.tasks && Array.isArray(tasksResponse.tasks)) {
      tasks = tasksResponse.tasks;
    } else {
      console.error('Unexpected response format:', tasksResponse);
      this.errorMessage = 'Unexpected data format received';
      this.isLoading = false;
      return;
    }
    
    // Find the task with the matching ID
    const taskIdNum = Number(this.taskId);
    const foundTask = tasks.find(task => task.id === taskIdNum);
    
    console.log('Found task:', foundTask);
    
    if (foundTask) {
      // Store the original task data
      this.originalTask = foundTask;
      
      // Populate the form with task data
      this.taskForm.patchValue({
        title: foundTask.title || '',
        description: foundTask.description || '',
        payout: foundTask.payout || 0,
        budget: foundTask.budget || 0,
        link: foundTask.link || '',
        difficulty: foundTask.difficulty || 'MEDIUM',
        status: foundTask.status || 'PENDING'
      });
      
      this.isLoading = false;
    } else {
      this.errorMessage = 'Task not found in the available tasks';
      this.isLoading = false;
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      // Get the current form values
      const formValues = this.taskForm.value;
      
      // Create the updated task object with the correct structure
      const updatedTask: Task = {
        id: Number(this.taskId),
        title: formValues.title,
        description: formValues.description,
        payout: formValues.payout,
        budget: formValues.budget,
        link: formValues.link,
        difficulty: formValues.difficulty,
        status: formValues.status,
        // Preserve the creator object from the original task
        creator: this.originalTask?.creator || {
          id: 1,
          username: "Bob",
          virtualMoney: 100
        }
      };

      console.log('Sending update request with data:', updatedTask);

      TaskService.updateTask(this.taskId, updatedTask)
        .then((response) => {
          console.log('Task updated successfully', response);
          this.router.navigate(['/task-home']);
        })
        .catch((error) => {
          console.error('Error updating task', error);
          this.errorMessage = 'Error updating task. Please try again.';
          this.isLoading = false;
        });
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.taskForm.controls).forEach(key => {
        this.taskForm.get(key)?.markAsTouched();
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/task-home']);
  }
}