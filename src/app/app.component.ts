import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-root',
  // standalone: true,
  imports: [CommonModule, RouterOutlet], // ✅ Added CommonModule for *ngIf, *ngFor
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'innovactions_frontend';
  data: any = null; // Variable to store the fetched data

  fetchData() {
    console.log("simple");
    axios
      .get('http://localhost:8081/users/1') // ✅ Use HttpClient
      .then((response) => {
        this.data = response; // Store the fetched data
        console.log(this.data); // Log it to the console
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
}