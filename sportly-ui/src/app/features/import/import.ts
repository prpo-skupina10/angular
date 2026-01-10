import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ImportService } from '../../core/services/import.service';

@Component({
  selector: 'app-import',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './import.html'
})
export class ImportComponent {
  message = '';
  loading = false;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private importService: ImportService
  ) {
    this.form = this.fb.group({
      leagueId: 39,
      season: 2023
    });
  }

  importLeagues() {
    this.run(this.importService.importLeagues());
  }

  importTeams() {
    const { leagueId, season } = this.form.value;
    this.run(this.importService.importTeams(leagueId!, season!));
  }

  importPlayers() {
    const { leagueId } = this.form.value;
    this.run(this.importService.importPlayersByLeague(leagueId!));
  }

  importStandings() {
    const { leagueId, season } = this.form.value;
    this.run(this.importService.importStandings(leagueId!, season!));
  }

  private run(obs: any) {
    this.loading = true;
    this.message = '';

    obs.subscribe({
      next: (msg: string) => {
        this.message = msg;
        this.loading = false;
      },
      error: (err: any) => {
        this.message = err?.error || 'Import failed';
        this.loading = false;
      }
    });
  }
}