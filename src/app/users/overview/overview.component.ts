import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { environment }  from '../../../environments/environment'
import UserService from '../shared/user.service';

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

  async fetchData() {
    console.log('Fetching data...');
    const data = await UserService.getUserById(1)
    this.data = data;
    console.log(this.data);
    // axios
    //   .get(`${environment.apiUrl}/users/1`)
    //   .then((response) => {
    //     this.data = response.data;
    //     console.log(this.data);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching data:', error);
    //   });
  }
}
