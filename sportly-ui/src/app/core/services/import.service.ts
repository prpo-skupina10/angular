import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ImportService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  importLeagues() {
    return this.http.post(`${this.api}/import/leagues`, null, {
      responseType: 'text'
    });
  }

  importTeams(leagueId: number, season: number) {
    return this.http.post(
      `${this.api}/import/teams/${leagueId}/${season}`,
      null,
      { responseType: 'text' }
    );
  }

  importPlayersByLeague(leagueId: number) {
    return this.http.post(
      `${this.api}/import/players/league/${leagueId}`,
      null,
      { responseType: 'text' }
    );
  }

  importStandings(leagueId: number, season: number) {
    return this.http.post(
      `${this.api}/import/standings/${leagueId}/${season}`,
      null,
      { responseType: 'text' }
    );
  }
}
