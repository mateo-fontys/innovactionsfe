import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule here
import axios from 'axios';

@Component({
  selector: 'app-root',
  // standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule], // ✅ Added FormsModule here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'innovactions_frontend';
  data: any = null; // Variable to store the fetched data


  newVirtualMoney: number = 1000; // The amount of virtual money to update

  // Method to fetch data from the API
  fetchData() {
    console.log('Fetching data...');
    axios
      .get('http://localhost:8080/users/1')
      .then((response) => {
        this.data = response.data; // Store the fetched data
        console.log(this.data); // Log the fetched data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  // Method to update the virtual money
  updateVirtualMoney() {
    console.log('Updating virtual money...');
    axios
      .put('http://localhost:8080/users/1', {
        // TODO: make username not hardcoded
        username: "rob",
        virtualMoney: this.newVirtualMoney, // The updated virtualMoney value
      })
      .then((response) => {
        console.log('Virtual money updated:', response.data);
        this.data = response.data; // Optionally update the data with the updated user info
      })
      .catch((error) => {
        console.error('Error updating virtual money:', error);
      });
  }
}