import { TokenService } from '../../../services';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lens-academy-dropdown-profile-company',
  templateUrl: './dropdown-profile-company.component.html',
  styleUrls: ['./dropdown-profile-company.component.css'],
})
export class DropdownProfileCompanyComponent {
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
