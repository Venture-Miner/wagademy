import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { LensService } from '../lens';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private token = new BehaviorSubject<string>('');
  private refreshToken = new BehaviorSubject<string>('');
  private expirationTime = new BehaviorSubject<string>('');
  private refreshTokenExpirationTime = new BehaviorSubject<string>('');
  private accountType = new BehaviorSubject<string>('');

  constructor(private lensService: LensService, private router: Router) {}

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.token.next(token);
    this.setTokenExpiration(token);
  }

  setTokenExpiration(token: string) {
    const { exp } = jwt_decode(token) as { exp: number };
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(exp);
    localStorage.setItem('expirationTime', expirationDate.toString());
    this.expirationTime.next(expirationDate.toString());
  }

  setRefreshTokenExpirationTime(refreshToken: string) {
    const { exp } = jwt_decode(refreshToken) as { exp: number };
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(exp);
    localStorage.setItem(
      'refreshTokenExpirationTime',
      expirationDate.toString()
    );
    this.refreshTokenExpirationTime.next(expirationDate.toString());
  }

  setRefreshToken(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken);
    this.refreshToken.next(refreshToken);
    this.setRefreshTokenExpirationTime(refreshToken);
  }

  setAccountType(accountType: string) {
    localStorage.setItem('accountType', accountType);
    this.accountType.next(accountType);
  }

  getToken() {
    if (!this.token.value) this.token.next(localStorage.getItem('token') || '');
    return this.token.asObservable();
  }

  getTokenValue() {
    if (!this.token.value) this.token.next(localStorage.getItem('token') || '');
    return this.token.value;
  }

  getRefreshTokenValue() {
    if (!this.refreshToken.value)
      this.refreshToken.next(localStorage.getItem('refreshToken') || '');
    return this.refreshToken.value;
  }

  getTokenExpirationValue() {
    if (!this.expirationTime.value)
      this.expirationTime.next(localStorage.getItem('expirationTime') || '');
    return this.expirationTime.value;
  }

  getRefreshTokenExpirationValue() {
    if (!this.refreshTokenExpirationTime.value)
      this.refreshTokenExpirationTime.next(
        localStorage.getItem('refreshTokenExpirationTime') || ''
      );
    return this.refreshTokenExpirationTime.value;
  }

  getWalletAddress() {
    if (!this.token.value) this.token.next(localStorage.getItem('token') || '');
    return (jwt_decode(this.token.value) as { id: string }).id;
  }

  async getRefreshToken(refreshToken: string) {
    const {
      data: { refresh },
    } = await this.lensService.client.mutate({
      mutation: this.lensService.refreshToken,
      variables: {
        request: { refreshToken },
      },
    });
    this.setRefreshToken(refresh.refreshToken);
    this.setToken(refresh.accessToken);
  }

  getAccountType() {
    if (!this.accountType.value)
      this.accountType.next(localStorage.getItem('accountType') || '');
    return this.accountType.value;
  }

  autoRefresh() {
    const expirationDate = this.getTokenExpirationValue();
    const refreshExpirationDate = this.getRefreshTokenExpirationValue();
    if (!expirationDate.length || !refreshExpirationDate.length) return;
    setTimeout(() => {
      this.logout();
      this.router.navigate(['']);
    }, new Date(refreshExpirationDate).getTime() - Date.now());
    setTimeout(() => {
      this.getRefreshToken(this.getRefreshTokenValue());
    }, new Date(expirationDate).getTime() - Date.now());
  }

  logout() {
    this.token.next('');
    this.refreshToken.next('');
    this.expirationTime.next('');
    this.refreshTokenExpirationTime.next('');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('refreshTokenExpirationTime');
  }
}
