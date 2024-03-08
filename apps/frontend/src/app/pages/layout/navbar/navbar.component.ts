import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'wagademy-navbar',
  standalone: true,
  imports: [NgClass, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  showMenu = false;
  existingProfileImage = './assets/img/images/img-user-profile.svg';

  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }
}
