import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(payload: RegisterRequest) {
    return this.http.post<void>(
      `${this.apiUrl}/auth/register`,
      payload
    );
  }


  login(usernameOrEmail: string, password: string): Observable<LoginResponse> {
    const payload: LoginRequest = { usernameOrEmail, password };

    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/login`, payload)
      .pipe(
        tap(response => {
          localStorage.setItem('jwt', response.token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('jwt');
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
