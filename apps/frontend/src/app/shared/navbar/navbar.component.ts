import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'wagademy-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(public router: Router) {}
}
