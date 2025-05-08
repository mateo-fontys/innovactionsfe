import { Component } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { environment } from "../../../environments/environment"
import BugReportService from "../shared/bug-report.service"
import { BugReport } from "../shared/bug-report.model"
import { Task } from "../shared/task.model"
import { Router } from "@angular/router"

@Component({
  selector: "app-report-form",
  standalone: true,
  imports: [FormsModule, CommonModule,],
  templateUrl: "./bug-report-form.component.html",
  styleUrls: ["./bug-report-form.component.css"],
})

export class BugReportFormComponent {
  reportText = ""
  userId = 1
  taskId = 101
  apiUrl = `${environment.apiUrl}/report`
  isSubmitting = false
  isSuccess = false
  errorMessage = ""
  task: Task


constructor( private router: Router) {
  const nav = this.router.getCurrentNavigation();
  this.task = nav?.extras?.state?.['task'];
  console.log(this.task)
}

  submitReport(): void {
    // Validate input
    if (!this.reportText.trim()) {
      this.errorMessage = "Please enter a bug report before submitting"
      return
    }

    this.isSubmitting = true
    this.errorMessage = ""

    const newReport : BugReport = {
      userId: this.userId,
      taskId: this.taskId,
      reportText: this.reportText,
      status: "PENDING",
    }

    BugReportService.submitReport(newReport);
    // this.http.post(this.apiUrl, newReport).subscribe(
    //   (response) => {
    //     console.log("Bug report submitted:", response)
    //     this.isSubmitting = false
    //     this.isSuccess = true
    //     this.reportText = ""

    //     this.router.navigate(['/task-home'])
    //   },
    //   (error) => {
    //     console.error("Error submitting bug report:", error)
    //     this.isSubmitting = false
    //     this.errorMessage = "Failed to submit the bug report. Please try again."
    //   },
    // )
  }
}
