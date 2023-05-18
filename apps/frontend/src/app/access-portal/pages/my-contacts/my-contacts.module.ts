import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseModalModule } from '../../../shared/base-modal/base-modal.module';
import { ButtonPrimaryModule } from '../../../shared/button-primary/button-primary.module';
import { ButtonSecondaryModule } from '../../../shared/button-secondary/button-secondary.module';
import { FormFieldModule } from '../../../shared/form-field/form-field.module';
import { InputModule } from '../../../shared/input/input.module';
import { NavbarAuthenticatedModule } from '../../../shared/navbar-authenticated/navbar-authenticated.module';
import { TextAreaModule } from '../../../shared/text-area/text-area.module';
import { MyContactsRoutingModule } from './my-contacts-routing.module';
import { MyContactsComponent } from './my-contacts.component';

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
