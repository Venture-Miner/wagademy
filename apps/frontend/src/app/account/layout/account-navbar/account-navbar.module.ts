import { NgModule } from '@angular/core';
import { AccountNavbarComponent } from './account-navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AccountNavbarComponent],
  imports: [RouterModule],
  exports: [AccountNavbarComponent],
})
export class AccountNavbarModule {}
