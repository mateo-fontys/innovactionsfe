import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-overview',
  imports: [CommonModule, FormsModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'

})

export class OverviewComponent {
  data: any = null;

  // TODO: make base money not hardcoded
  newVirtualMoney: number = 1000;

  // Method to fetch data from the API
  fetchData() {
    console.log('Fetching data...');
    axios
      .get('http://localhost:8080/users/1')
      .then((response) => {
        this.data = response.data; 
        console.log(this.data);
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
        // TODO: make username not hardcoded/not needed
        username: "rob",
        virtualMoney: this.newVirtualMoney,
      })
      .then((response) => {
        console.log('Virtual money updated:', response.data);
        this.data = response.data;
      })
      .catch((error) => {
        console.error('Error updating virtual money:', error);
      });
  }
}
