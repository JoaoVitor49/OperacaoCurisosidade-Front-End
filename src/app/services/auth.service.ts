import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/authResponse.model';
import { UserRegister } from '../models/userRegister.model';
import { UserResponse } from '../models/userResponse.model';
import { UserLogin } from '../models/userLogin.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly apiUrl = environment.apiUrl + '/User';
  private router = inject(Router);

  constructor(private http: HttpClient) { }

  login(user: UserLogin): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, user).pipe(
      tap(response => {
        this.setSession(response)
        this.router.navigate(['/home']);
      })
    )
  }

  register(user: UserRegister): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}`, user);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private setSession(authResponse: AuthResponse): void {
    localStorage.setItem('token', authResponse.token);
    localStorage.setItem('username', authResponse.user.name);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
