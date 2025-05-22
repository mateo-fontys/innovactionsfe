import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-auth-test',
  templateUrl: './auth-test.component.html',
  styleUrls: ['./auth-test.component.css'],
  imports: [CommonModule]
})
export class AuthTestComponent {
  results: { [key: string]: string } = {};

  constructor(private http: HttpClient, private readonly keycloak: Keycloak) {}

  isAuthenticated() {
    return this.keycloak.authenticated;
  }

  hasRole(role: string) {
    return this.keycloak.hasRealmRole(role);
  }

  testAccess(role: string) {
    const endpoints: { [key: string]: string } = {
      any: 'http://localhost:8080/auth-test/any',
      auth: 'http://localhost:8080/auth-test/auth',
      tester: 'http://localhost:8080/auth-test/tester',
      creator: 'http://localhost:8080/auth-test/creator',
      admin: 'http://localhost:8080/auth-test/admin'
    };

    this.http.post(endpoints[role], {}, {responseType: "text"}).subscribe({
      next: (response: string) => {
        this.results[role] = response;
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 401 || error.status === 403) {
          this.results[role] = 'Unauthorized';
        } else {
          this.results[role] = 'Request failed';
        }
      }
    });
  }
}
