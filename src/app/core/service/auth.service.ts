import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/auth';

  login(payload: LoginPayload): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, payload)
      .pipe(
        tap(response => {
          localStorage.setItem('jwt_token', response.token)
        })
      );
  }

  logout(): void {

    localStorage.removeItem('jwt_token');
  }

  getToken(): string | null {

    return localStorage.getItem('jwt_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

}
