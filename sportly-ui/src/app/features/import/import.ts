import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Subject, Observable, switchMap, startWith } from 'rxjs';
import { ImportService } from '../../core/services/import.service';

@Component({
  selector: 'app-import',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './import.html'
})
export class ImportComponent {

  form!: FormGroup;

  private trigger$ = new Subject<Observable<string>>();
  result$!: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private importService: ImportService
  ) {
    this.form = this.fb.group({
      leagueId: 39,
      season: 2023
    });

    this.result$ = this.trigger$.pipe(
      switchMap(obs => obs),
      startWith('')
    );
  }

  importLeagues() {
    this.trigger$.next(this.importService.importLeagues());
  }

  importTeams() {
    const { leagueId, season } = this.form.value;
    this.trigger$.next(
      this.importService.importTeams(leagueId!, season!)
    );
  }

  importPlayers() {
    const { leagueId } = this.form.value;
    this.trigger$.next(
      this.importService.importPlayersByLeague(leagueId!)
    );
  }

  importStandings() {
    const { leagueId, season } = this.form.value;
    this.trigger$.next(
      this.importService.importStandings(leagueId!, season!)
    );
  }
}