import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { PlayerService, Player } from '../../core/services/player.service';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './players.html'
})
export class PlayersComponent {

  players$!: Observable<Player[]>;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.players$ = this.route.paramMap.pipe(
      switchMap(params => {
        const teamId = params.get('teamId');
        return teamId
          ? this.playerService.getPlayersByTeam(+teamId)
          : this.playerService.getAllPlayers();
      })
    );
  }
}