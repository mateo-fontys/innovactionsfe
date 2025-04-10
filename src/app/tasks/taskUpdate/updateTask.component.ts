import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../shared/TasksService';
import { Task } from '../shared/TaskModel';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
})
export class UpdateTaskComponent implements OnInit {
  taskForm!: FormGroup;
  taskId!: string;

  constructor(
    private fb: FormBuilder,
    private taskService: TasksService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id')!;
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['pending', Validators.required],
      dueDate: ['', Validators.required],
    });

    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task) => {
        this.taskForm.patchValue(task);
      },
      error: (err) => {
        console.error('Error loading task', err);
      },
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const updatedTask: Task = this.taskForm.value;
      this.taskService.updateTask(this.taskId, updatedTask).subscribe({
        next: () => {
          console.log('Task updated successfully');
          this.router.navigate(['/task-home']);
        },
        error: (err) => {
          console.error('Error updating task', err);
        },
      });
    }
  }
}
