import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { ProfileMetadata, ACCOUNT_TYPE } from '../interfaces';
import { TokenService, LensService } from '../services';

@Injectable({ providedIn: 'root' })
export class AccountTypeCompanyGuard {
  constructor(
    private readonly lensService: LensService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean | UrlTree> {
    if (this.tokenService.getAccountType() === ACCOUNT_TYPE.physicalPerson) {
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
