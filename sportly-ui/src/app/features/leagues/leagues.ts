import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { LeagueService, League } from '../../core/services/league.service';

@Component({
  selector: 'app-leagues',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leagues.html'
})
export class LeaguesComponent {

  leagues$!: Observable<League[]>;

  constructor(private leagueService: LeagueService) {}

  ngOnInit(): void {
    this.leagues$ = this.leagueService.getLeagues();
  }
}