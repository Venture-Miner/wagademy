import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BaseModalModule,
  ButtonPrimaryModule,
  ButtonSecondaryModule,
  FormFieldModule,
  InputModule,
  NavbarAuthenticatedModule,
  SuccessModalModule,
} from '@/shared';
import {
  CourseDetailsComponent,
  CourseDetailsRoutingModule,
  AddEmailModalComponent,
  EmailConfirmModalComponent,
} from '@/access-portal';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CourseDetailsComponent,
    AddEmailModalComponent,
    EmailConfirmModalComponent,
  ],
  imports: [
    CommonModule,
    CourseDetailsRoutingModule,
    ButtonSecondaryModule,
    NavbarAuthenticatedModule,
    BaseModalModule,
    ButtonPrimaryModule,
    InputModule,
    ReactiveFormsModule,
    FormFieldModule,
    SuccessModalModule,
  ],
})
export class CourseDetailsModule {}
