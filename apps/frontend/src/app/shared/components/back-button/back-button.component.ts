import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [],
  selector: 'wagademy-back-button',
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss',
})
export class BackButtonComponent {
  @Input() routerLink: string | undefined;
  constructor(public location: Location, private router: Router) {}

  back() {
    if (this.routerLink) {
      this.router.navigate([this.routerLink]);
    } else this.location.back();
  }
}
