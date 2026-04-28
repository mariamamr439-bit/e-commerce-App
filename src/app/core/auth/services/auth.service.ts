import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserDataResponse } from '../models/user-data.interface';
import {
  ForgotPasswordResponse,
  ResetPasswordResponse,
  VerifyResetResponse,
} from '../models/forgot-password.interface';
import { isPlatformBrowser } from '@angular/common';
import { platform } from 'os';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly platform = inject(PLATFORM_ID);
  isLogged: WritableSignal<boolean> = signal<boolean>(false);
  sendRegisterData(data: object): Observable<UserDataResponse> {
    return this.httpClient.post<UserDataResponse>(
      environment.base_url + '/api/v1/auth/signup',
      data,
    );
  }
  sendLoginData(data: object): Observable<UserDataResponse> {
    return this.httpClient.post<UserDataResponse>(
      environment.base_url + '/api/v1/auth/signin',
      data,
    );
  }

  forgotPassword(data: object): Observable<ForgotPasswordResponse> {
    return this.httpClient.post<ForgotPasswordResponse>(
      environment.base_url + '/api/v1/auth/forgotPasswords',
      data,
    );
  }

  verifyResetCode(data: object): Observable<VerifyResetResponse> {
    return this.httpClient.post<VerifyResetResponse>(
      environment.base_url + '/api/v1/auth/verifyResetCode',
      data,
    );
  }

  resetPassword(data: object): Observable<ResetPasswordResponse> {
    return this.httpClient.put<ResetPasswordResponse>(
      environment.base_url + '/api/v1/auth/resetPassword',
      data,
    );
  }
  checkLogin(): void {
    if (isPlatformBrowser(this.platform)) {
      const token = localStorage.getItem('freshToken');
      if (token) {
        this.isLogged.set(true);
      } else {
        this.isLogged.set(false);
      }
    }
  }
  logout(): void {
    if (isPlatformBrowser(this.platform)) {
      localStorage.removeItem('freshToken');
      localStorage.removeItem('freshUser');
      localStorage.removeItem('userData');
    }
    this.isLogged.set(false);
    this.router.navigate(['/login']);
  }

  decodeUserToken(): void {
    const token = localStorage.getItem('freshToken');
    if (token) {
      const userData = jwtDecode(token);
      localStorage.setItem('userData' , JSON.stringify(userData));
    }
  }
}
