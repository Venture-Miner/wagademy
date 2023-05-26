import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { LensService, TokenService } from '../services';
import { ProfileMetadata, ACCOUNT_TYPE } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class AccountTypePersonGuard {
  constructor(
    private readonly lensService: LensService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const {
      data: {
        profile: { attributes },
      },
    }: { data: { profile: ProfileMetadata } } =
      await this.lensService.client.query({
        query: this.lensService.getProfileAttributes,
        variables: { request: { profileId: '0x7ffe' } },
      });
    const accountTypeAttribute = attributes.filter(
      ({ key }) => key === 'ACCOUNT_TYPE'
    );
    if (accountTypeAttribute[0].value === ACCOUNT_TYPE.company) {
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
