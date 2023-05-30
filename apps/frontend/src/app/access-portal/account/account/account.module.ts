import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonPrimaryModule } from '../../../shared/button-primary/button-primary.module';
import { BaseModalModule } from '../../../shared/base-modal/base-modal.module';
import { NavbarModule } from '../../../shared/navbar/navbar.module';
import { InputModule } from '../../../shared/input/input.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    BaseModalModule,
    NavbarModule,
    InputModule,
    ReactiveFormsModule,
    ButtonPrimaryModule,
  ],
})
export class AccountModule {}
