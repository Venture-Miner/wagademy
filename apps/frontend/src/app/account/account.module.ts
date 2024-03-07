import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { AccountNavbarModule } from './layout/account-navbar/account-navbar.module';

@NgModule({
  declarations: [AccountComponent],
  imports: [AccountRoutingModule, AccountNavbarModule],
})
export class AccountModule {}
