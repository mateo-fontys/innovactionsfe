import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import BugReportService from '../shared/bugReport.service';

@Component({
  selector: 'app-bug-report-home',
  templateUrl: './bugReportHome.component.html',
  styleUrls: ['./bugReportHome.component.css'],
  imports: [CommonModule, QuillModule, FormsModule]
})
export class BugReportHomeComponent implements OnInit {
  bugReports: any[] = [];
  expandedIndex: number | null = null;
  quillModules = {
    toolbar: false
  };

  constructor() {}

  async ngOnInit() {
    try {
      this.bugReports = await BugReportService.getAllBugReports();
      this.bugReports = this.bugReports.map(report => ({
        ...report,
        mediaFiles: [report.screenRecording, ...(report.additionalFiles || [])],
        currentImageIndex: 0
      }));
    } catch (error) {
      console.error('Error fetching bug reports:', error);
    }
  }

  toggleExpand(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  prevImage(index: number) {
    const report = this.bugReports[index];
    report.currentImageIndex = (report.currentImageIndex - 1 + report.mediaFiles.length) % report.mediaFiles.length;
  }

  nextImage(index: number) {
    const report = this.bugReports[index];
    report.currentImageIndex = (report.currentImageIndex + 1) % report.mediaFiles.length;
  }

  openImageInFullScreen(imageBase64: string) {
    const image = new Image();
    image.src = `data:image/png;base64,${imageBase64}`;
    const w = window.open('');
    w?.document.write(image.outerHTML);
  }
}
