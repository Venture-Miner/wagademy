import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonPrimaryModule,
  NavbarModule,
  BaseModalModule,
  InputModule,
} from '@/shared';
import {
  AccountTypeRoutingModule,
  AccountTypeComponent,
} from '@/access-portal';
import { ReactiveFormsModule } from '@angular/forms';

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
  ],
})
export class AccountTypeModule {}
