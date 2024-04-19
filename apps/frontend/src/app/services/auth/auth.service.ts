import { Injectable } from '@angular/core';
import { Hub } from 'aws-amplify/utils';
import { fetchAuthSession } from 'aws-amplify/auth';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { HttpError } from '../../shared/types/http-error';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { AccountTypeEnum, CreateUserFrontendDto, User } from '@wagademy/types';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly location: Location
  ) {}

  async initiateListener() {
    Hub.listen('auth', async ({ payload }) => {
      switch (payload.event) {
        case 'signedIn': {
          this.handleSignIn();
          break;
        }
        case 'signedOut': {
          this.handleSignOut();
          break;
        }
        default:
          break;
      }
    });
    Hub.listen('custom', async ({ payload }) => {
      switch (payload.event) {
        case 'signedUp': {
          this.handleSignUp(payload.data as any);
          break;
        }
        default:
          break;
      }
    });
    this.handleSignIn();
  }

  async loadUserData() {
    const user = await firstValueFrom(this.userService.self());
    this.user.next(user);
  }

  async getUserData() {
    const user = await firstValueFrom(this.user);
    if (!user) {
      await this.loadUserData();
      return firstValueFrom(this.user);
    }
    return user;
  }

  private async handleSignUp(data: {
    name: string;
    userType: AccountTypeEnum;
  }) {
    const user = await firstValueFrom(
      this.userService.create({ name: data.name, accountType: data.userType })
    );
    this.user.next(user);
    this.handleRouteToRedirect(user);
  }

  private handleRouteToRedirect(user: User | null) {
    const whichHome =
      user?.accountType === AccountTypeEnum.COMPANY ? '-company' : '';
    this.router.navigate([`/pages/home${whichHome}`]);
  }

  private async handleSignIn() {
    try {
      const idToken = (await fetchAuthSession()).tokens?.idToken?.toString();
      if (!idToken) return;
      try {
        await this.loadUserData();
      } catch (error) {
        if (!(error instanceof HttpErrorResponse)) throw error;
        // TODO: Throw error code in the api instead of handling it by message
        const message = (error.error as HttpError).message;
        if (
          message === 'The authenticated user does not exist in the database.'
        ) {
          // const user = await firstValueFrom(this.userService.create());
          // this.user.next(user);
        } else {
          throw error;
        }
      } finally {
        const currentRoute = this.location.path();
        const authenticationRoutes = [
          '/account/sign-in',
          '/account/sign-up',
          '/account/reset-password',
        ];
        if (authenticationRoutes.includes(currentRoute)) {
          const user = await this.getUserData();
          this.handleRouteToRedirect(user);
        }
      }
    } catch (error) {
      console.error('Error handling sign in:', error);
    }
  }

  private handleSignOut() {
    this.user.next(null);
    this.router.navigate(['/account/sign-in']);
  }
}
