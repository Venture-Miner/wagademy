import { Component } from '@angular/core';

@Component({
  selector: 'wagademy-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  showMenu = false;

  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }
}
