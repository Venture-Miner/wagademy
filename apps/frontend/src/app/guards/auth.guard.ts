import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { getCurrentUser } from 'aws-amplify/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private readonly router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return getCurrentUser()
      .then(() => {
        return true;
      })
      .catch(() => {
        this.router.navigate(['/account/sign-in']);
        return false;
      });
  }
}
