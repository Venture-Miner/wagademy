import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';

@Component({
  selector: 'wagademy-account',
  templateUrl: './account.component.html',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
})
export class AccountComponent {}
