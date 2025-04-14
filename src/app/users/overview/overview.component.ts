import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent implements OnInit {
  data: any 

  ngOnInit() {
    this.fetchData();
  }

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
}
