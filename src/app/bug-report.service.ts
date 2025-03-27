import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BugReport } from './bug-report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:8080/api/reports';

  constructor(private http: HttpClient) {}

  submitReport(report: BugReport): Observable<BugReport> {
    return this.http.post<BugReport>(this.apiUrl, report);
  }
}
