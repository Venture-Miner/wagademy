import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'wagademy-navbar-landing',
  templateUrl: './navbar-landing.component.html',
  styleUrls: ['./navbar-landing.component.scss'],
  imports: [NgOptimizedImage, RouterModule, NgClass],
})
export class NavbarLandingComponent {
  showMenu = false;

  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }
}
