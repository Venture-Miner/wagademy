import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { NavbarAccountComponent } from '../shared/components/layout/navbar-account/navbar-account.component';

@NgModule({
  declarations: [AccountComponent],
  imports: [AccountRoutingModule, NavbarAccountComponent],
})
export class AccountModule {}
