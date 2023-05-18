import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MyContactsRoutingModule, MyContactsComponent } from '../my-contacts';
import {
  BaseModalModule,
  ButtonPrimaryModule,
  ButtonSecondaryModule,
  FormFieldModule,
  InputModule,
  NavbarAuthenticatedModule,
  TextAreaModule,
} from '../../../shared';

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
