import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface ChartResponse {
  chart_url: string;
}

@Injectable({ providedIn: 'root' })
export class ChartsService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  playersByPosition(teamId: number): Observable<ChartResponse> {
    return this.http.get<ChartResponse>(
      `${this.api}/charts/players/${teamId}/by-position`
    );
  }

  standings(leagueId: number, season: number): Observable<ChartResponse> {
    return this.http.get<ChartResponse>(
      `${this.api}/charts/standings/${leagueId}/${season}`
    );
  }
}