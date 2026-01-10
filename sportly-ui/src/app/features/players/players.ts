import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PlayerService, Player } from '../../core/services/player.service';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './players.html'
})
export class PlayersComponent implements OnInit {

  players: Player[] = [];
  loading = true;
  error: string | null = null;
  teamId!: number;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    const teamIdParam = this.route.snapshot.paramMap.get('teamId');

    if (teamIdParam) {
      const teamId = Number(teamIdParam);

      this.playerService.getPlayersByTeam(teamId).subscribe({
        next: data => {
          this.players = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load players by team';
          this.loading = false;
        }
      });

    } else {
      this.playerService.getAllPlayers().subscribe({
        next: data => {
          this.players = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load players';
          this.loading = false;
        }
      });
    }
  }

}