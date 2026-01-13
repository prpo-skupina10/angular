import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface FixtureOdds {
  fixtureId: number;
  externalFixtureId: number;
  leagueId: number;
  matchday: number;
  homeTeamId: number;
  awayTeamId: number;
  homeTeamName: string;
  awayTeamName: string;
  utcDate: string;
  status: string;
  homeWinOdds: number;
  drawOdds: number;
  awayWinOdds: number;
}

export type BetSelection = 'HOME' | 'DRAW' | 'AWAY';

export interface BetRequest {
  fixtureId: number;
  selection: BetSelection;
  stake: number;
}

export interface BetResponse {
  id: number;
  fixtureId: number;
  externalFixtureId: number;
  leagueId: number;
  selection: BetSelection;
  status: 'OPEN' | 'WON' | 'LOST';
  stake: number;
  odds: number;
  potentialPayout: number;
  placedAt: string;
  settledAt?: string;
  result?: string;
}

@Injectable({ providedIn: 'root' })
export class BettingService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getFixturesWithOdds(): Observable<FixtureOdds[]> {
    return this.http.get<FixtureOdds[]>(`${this.api}/odds/fixtures`);
  }

  placeBet(request: BetRequest): Observable<BetResponse> {
    return this.http.post<BetResponse>(`${this.api}/betting/bets`, request);
  }

  listBets(): Observable<BetResponse[]> {
    return this.http.get<BetResponse[]>(`${this.api}/betting/bets`);
  }

  triggerFixturesImport(): Observable<void> {
    // importaj za premier league hardcoded
    return this.http.post<void>(`${this.api}/import-betting/fixtures/premier-league`, {});
  }
}
