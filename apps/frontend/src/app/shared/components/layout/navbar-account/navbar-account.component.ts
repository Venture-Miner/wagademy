import { Component } from '@angular/core';

@Component({
  selector: 'wagademy-navbar-account',
  templateUrl: './navbar-account.component.html',
  styleUrls: ['./navbar-account.component.scss'],
})
export class NavbarAccountComponent {
  showMenu = false;

  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }
}
