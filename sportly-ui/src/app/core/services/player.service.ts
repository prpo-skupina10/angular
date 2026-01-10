import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Player {
  id: number;
  name: string;
  position?: string;
  age?: number;
  nationality?: string;
}

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllPlayers() {
    return this.http.get<Player[]>(`${this.api}/players`);
  }

  getPlayersByTeam(teamId: number) {
    return this.http.get<Player[]>(`${this.api}/players/team/${teamId}`);
  }
}