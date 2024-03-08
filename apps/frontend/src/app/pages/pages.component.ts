import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';

@Component({
  selector: 'wagademy-pages',
  templateUrl: './pages.component.html',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
})
export class PagesComponent {}
