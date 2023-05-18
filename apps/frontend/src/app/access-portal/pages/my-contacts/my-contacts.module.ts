import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyContactsRoutingModule, MyContactsComponent } from '@/access-portal';

import {
  BaseModalModule,
  ButtonPrimaryModule,
  ButtonSecondaryModule,
  FormFieldModule,
  InputModule,
  NavbarAuthenticatedModule,
  TextAreaModule,
} from '@/shared';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MyContactsComponent],
  imports: [
    CommonModule,
    MyContactsRoutingModule,
    ButtonSecondaryModule,
    NavbarAuthenticatedModule,
    BaseModalModule,
    ButtonPrimaryModule,
    FormFieldModule,
    TextAreaModule,
    ReactiveFormsModule,
    InputModule,
  ],
})
export class MyContactsModule {}
