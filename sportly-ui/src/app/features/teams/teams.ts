import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TeamService, Team } from '../../core/services/team.service';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teams.html'
})
export class TeamsComponent implements OnInit {

  teams: Team[] = [];
  loading = true;
  error: string | null = null;
  leagueId!: number;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    const leagueIdParam = this.route.snapshot.paramMap.get('leagueId');

    if (leagueIdParam) {
      const leagueId = Number(leagueIdParam);

      this.teamService.getTeamsByLeague(leagueId).subscribe({
        next: data => {
          this.teams = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load teams by league';
          this.loading = false;
        }
      });

    } else {
      this.teamService.getAllTeams().subscribe({
        next: data => {
          this.teams = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load teams';
          this.loading = false;
        }
      });
    }
  }

}