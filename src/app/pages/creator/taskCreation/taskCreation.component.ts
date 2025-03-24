import { Component } from '@angular/core';
import { NgbdDatepickerMultiple } from "../../../components/dateTimePicker/dateTimePicker";
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

@Component({
  selector: 'app-task-creation',
  standalone: true,
  templateUrl: './taskCreation.component.html',
  styleUrls: ['./taskCreation.component.css'],
  imports: [NgbdDatepickerMultiple, ReactiveFormsModule] // Add ReactiveFormsModule to imports
})
export class TaskCreationComponent {
}