import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { TokenService } from '../services';
import { ACCOUNT_TYPE } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class AccountTypePersonGuard {
  constructor(private tokenService: TokenService, private router: Router) {}

  async canActivate(): Promise<boolean | UrlTree> {
    if (this.tokenService.getAccountType() === ACCOUNT_TYPE.company) {
      this.tokenService.logout();
      return this.redirectPage();
    }
    return true;
  }

  async redirectPage(): Promise<boolean> {
    await this.router.navigate(['']);
    return false;
  }
}
