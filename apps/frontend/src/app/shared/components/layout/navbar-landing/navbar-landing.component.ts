import { Component } from '@angular/core';

@Component({
  selector: 'wagademy-navbar-landing',
  templateUrl: './navbar-landing.component.html',
  styleUrls: ['./navbar-landing.component.scss'],
})
export class NavbarLandingComponent {
  showMenu = false;

  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }
}
