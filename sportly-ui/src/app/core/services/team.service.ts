import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Team {
  id: number;
  name: string;
  logo?: string;
  venue?: string;
}

@Injectable({ providedIn: 'root' })
export class TeamService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.api}/teams`);
  }

  getTeamsByLeague(leagueId: number): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.api}/teams/leagues/${leagueId}`);
  }
}
