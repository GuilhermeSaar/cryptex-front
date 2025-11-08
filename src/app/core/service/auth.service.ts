import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private readonly apiurl = 'http://localhost:8080/api/auth';
  private readonly TOKEN_KEY = 'jwt_token';

  login(payload: LoginPayload): Observable<TokenResponse> {

    return this.http.post<TokenResponse>(`${this.apiurl}/login`, payload)
      .pipe(
        tap(response => {
          sessionStorage.setItem(this.TOKEN_KEY, response.token);
        })
      );
  }

  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null{
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

}
