import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'wagademy-landing',
  templateUrl: './landing.component.html',
  standalone: true,
  imports: [RouterModule, NavbarComponent, FooterComponent],
})
export class LandingComponent {}
