import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { AccountTypeEnum } from '@wagademy/types';

@Injectable({ providedIn: 'root' })
export class AccountTypeUserGuard {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const user = await this.authService.getUserData();
    if (user?.accountType === AccountTypeEnum.COMPANY) {
      return this.redirectPage();
    }
    return true;
  }

  async redirectPage(): Promise<boolean> {
    await this.router.navigate(['/pages/home']);
    return false;
  }
}
