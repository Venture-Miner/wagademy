import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  standalone: true,
  imports: [],
  selector: 'wagademy-back-button',
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss',
})
export class BackButtonComponent {
  constructor(public location: Location) {}

  back() {
    this.location.back();
  }
}
