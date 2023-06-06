import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonPrimaryModule } from '../../../shared/button-primary/button-primary.module';
import { BaseModalModule } from '../../../shared/base-modal/base-modal.module';
import { NavbarModule } from '../../../shared/navbar/navbar.module';
import { InputModule } from '../../../shared/input/input.module';
import { AccountTypeComponent } from './account-type.component';
import { AccountTypeRoutingModule } from './account-type-routing.module';
import { WarningModalModule } from '../../../shared/warning-modal/warning-modal.module';

@NgModule({
  declarations: [AccountTypeComponent],
  imports: [
    CommonModule,
    AccountTypeRoutingModule,
    ButtonPrimaryModule,
    BaseModalModule,
    NavbarModule,
    InputModule,
    ReactiveFormsModule,
    WarningModalModule,
  ],
})
export class AccountTypeModule {}
