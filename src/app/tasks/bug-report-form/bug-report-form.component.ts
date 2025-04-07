import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-form',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './bug-report-form.component.html',
  styleUrls: ['./bug-report-form.component.css']
})

export class BugReportFormComponent {
  reportText: string = '';
  userId: number = 1;
  taskId: number = 101;
  apiUrl: string = '/api/report';

  constructor(private http: HttpClient) {}

  submitReport() {
    const newReport = {
      userId: this.userId,
      taskId: this.taskId,
      reportText: this.reportText,
      status: 'PENDING'
    };

    this.http.post(this.apiUrl, newReport).subscribe(response => {
      console.log('Bug report submitted:', response);
      alert('Bug report submitted successfully!');
      this.reportText = '';
    }, error => {
      console.error('Error submitting bug report:', error);
      alert('Failed to submit the bug report');
    });
  }
}
