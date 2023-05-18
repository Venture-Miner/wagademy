import { TokenService } from '@/services';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lens-academy-dropdown-profile',
  templateUrl: './dropdown-profile.component.html',
  styleUrls: ['./dropdown-profile.component.css'],
})
export class DropdownProfileComponent {
  showDropdown = false;

  constructor(
    private readonly tokenService: TokenService,
    private router: Router
  ) {}

  logout() {
    this.tokenService.logout();
    this.router.navigate(['']);
  }
}
