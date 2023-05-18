import { LensService, TokenService } from '@/services';
import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private readonly lensService: LensService,
    private readonly tokenService: TokenService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean | UrlTree> {
    if (!this.tokenService.getTokenValue().length) return this.redirectPage();
    const {
      data: { verify },
    } = await this.lensService.client.query({
      query: this.lensService.verifyToken,
      variables: {
        request: {
          accessToken: this.tokenService.getTokenValue(),
        },
      },
    });
    if (!verify) return this.redirectPage();
    return verify;
  }

  redirectPage(): boolean {
    this.router.navigate(['']);
    return false;
  }
}
