import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';  // Assuming you have a User model
import { environment }  from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // Make sure the correct URL is used
  fetchData(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/api/users/1`);
  }
}
