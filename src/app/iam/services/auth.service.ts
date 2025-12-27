import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { SignInRequest } from '../models/sign-in-request.model';
import { SignInResponse } from '../models/sign-in-response.model';
import { SignUpRequest } from '../models/sign-up-request.model';
import { User } from '../models/user.model';
import { AuthenticatedUser } from '../models/authenticated-user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private readonly STORAGE_KEY = 'authenticated_user';
  
  private currentUserSubject = new BehaviorSubject<AuthenticatedUser | null>(this.getStoredUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  signUp(username: string, password: string): Observable<User> {
    const request: SignUpRequest = {
      username,
      password,
      roles: ['ROLE_USER']
    };
    return this.http.post<User>(`${this.apiUrl}/sign-up`, request);
  }

  signIn(username: string, password: string): Observable<SignInResponse> {
    const request: SignInRequest = { username, password };
    return this.http.post<any>(`${this.apiUrl}/sign-in`, request).pipe(
      tap((response: any) => {
        console.log('[AuthService] Sign-in response (raw):', JSON.stringify(response, null, 2));
        
        const token = response.token || response.accessToken || response.access_token;
        const id = response.id || response.userId || response.user_id;
        const role = response.role || (response.roles && response.roles[0]) || 'ROLE_USER';
        
        console.log('[AuthService] Extracted - token:', token, 'id:', id);
        
        if (!token) {
          console.error('[AuthService] NO TOKEN FOUND in response! Available keys:', Object.keys(response));
        }
        
        const user: AuthenticatedUser = {
          id: id,
          username: response.username,
          token: token,
          role: role
        };
        console.log('[AuthService] Storing user:', user);
        this.storeUser(user);
        this.currentUserSubject.next(user);
      })
    );
  }

  signOut(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getToken(): string | null {
    return this.currentUserSubject.value?.token ?? null;
  }

  getCurrentUserId(): number | null {
    return this.currentUserSubject.value?.id ?? null;
  }

  getCurrentUser(): AuthenticatedUser | null {
    return this.currentUserSubject.value;
  }

  private storeUser(user: AuthenticatedUser): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  private getStoredUser(): AuthenticatedUser | null {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  }
}
