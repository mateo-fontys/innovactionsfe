import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';  // Assuming you have a User model

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // Make sure the correct URL is used
  fetchData(): Observable<User> {
    return this.http.get<User>('/api/users/1');
  }
}
