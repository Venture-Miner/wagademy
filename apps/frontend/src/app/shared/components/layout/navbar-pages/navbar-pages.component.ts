import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'wagademy-navbar-pages',
  templateUrl: './navbar-pages.component.html',
  styleUrls: ['./navbar-pages.component.scss'],
  imports: [RouterModule, NgClass],
})
export class NavbarPagesComponent {
  showMenu = false;
  existingProfileImage = './assets/img/images/img-user-profile.svg';

  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }
}
