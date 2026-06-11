import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginResponse { accessToken: string; user: { id: number; email: string; name: string }; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private tokenSignal = signal<string | null>(null);
  private userSignal = signal<LoginResponse['user'] | null>(null);
  readonly isLoggedIn = computed(() => this.tokenSignal() !== null);
  readonly user = this.userSignal.asReadonly();

  get token() { return this.tokenSignal(); }

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/login`, { email, password })
      .pipe(tap((res) => { this.tokenSignal.set(res.accessToken); this.userSignal.set(res.user); }));
  }
  logout() { this.tokenSignal.set(null); this.userSignal.set(null); }
}
