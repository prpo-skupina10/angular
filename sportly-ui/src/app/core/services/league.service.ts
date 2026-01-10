import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface League {
  id: number;
  name: string;
  country: string;
  logo?: string;
}

@Injectable({ providedIn: 'root' })
export class LeagueService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLeagues(): Observable<League[]> {
    return this.http.get<League[]>(`${this.api}/leagues`);
  }
}