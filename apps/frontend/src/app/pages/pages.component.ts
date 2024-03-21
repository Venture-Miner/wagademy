import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarPagesComponent } from '../shared/components/layout/navbar-pages/navbar-pages.component';
@Component({
  selector: 'wagademy-pages',
  templateUrl: './pages.component.html',
  standalone: true,
  imports: [RouterModule, NavbarPagesComponent],
})
export class PagesComponent {}
