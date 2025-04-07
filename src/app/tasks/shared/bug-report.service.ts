import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BugReport } from './bug-report.model';
import { environment } from  '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = `${environment.apiUrl}/api/report`;

  constructor(private http: HttpClient) {}

  submitReport(report: BugReport): Observable<BugReport> {
    return this.http.post<BugReport>(this.apiUrl, report);
  }
}
