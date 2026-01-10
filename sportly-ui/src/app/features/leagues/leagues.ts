import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeagueService, League } from '../../core/services/league.service';

@Component({
  selector: 'app-leagues',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leagues.html'
})
export class LeaguesComponent implements OnInit {

  leagues: League[] = [];
  loading = true;
  error: string | null = null;

  constructor(private leagueService: LeagueService) {}

  ngOnInit(): void {
    this.leagueService.getLeagues().subscribe({
      next: (data) => {
        this.leagues = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load leagues';
        this.loading = false;
      }
    });
  }
}