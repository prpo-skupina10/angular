import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { TeamService, Team } from '../../core/services/team.service';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teams.html'
})
export class TeamsComponent {

  teams$!: Observable<Team[]>;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.teams$ = this.route.paramMap.pipe(
      switchMap(params => {
        const leagueId = params.get('leagueId');
        return leagueId
          ? this.teamService.getTeamsByLeague(+leagueId)
          : this.teamService.getAllTeams();
      })
    );
  }
}