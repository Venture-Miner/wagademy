import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarAccountComponent } from '../shared/components/layout/navbar-account/navbar-account.component';

@Component({
  selector: 'wagademy-pages',
  templateUrl: './account.component.html',
  standalone: true,
  imports: [RouterModule, NavbarAccountComponent],
})
export class AccountComponent {}
