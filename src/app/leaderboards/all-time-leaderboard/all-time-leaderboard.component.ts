import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from '../shared/leaderboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-time-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-time-leaderboard.component.html',
  styleUrls: ['./all-time-leaderboard.component.css'],
})
export class AllTimeLeaderboardComponent implements OnInit {
  leaderboard: any[] = [];

  async ngOnInit() {
    const response = await LeaderboardService.getAllTimeLeaderboard();
    console.log(response)
    this.leaderboard = response.leaderboard

    // if (!this.leaderboard || this.leaderboard.length === 0) {
    //   this.leaderboard = Array.from({ length: 10 }, (_, i) => ({
    //     id: i + 1,
    //     username: `MockUser${i + 1}`,
    //     virtualMoney: Math.floor(Math.random() * 10000) + 1000,
    //     experiencePoints: Math.floor(Math.random() * 5000) + 500,
    //   }));
    //   this.leaderboard.sort((a, b) => b.experiencePoints - a.experiencePoints);
    // }
  }
}
