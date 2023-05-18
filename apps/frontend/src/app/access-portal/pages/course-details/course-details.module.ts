import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseDetailsComponent } from './course-details.component';
import { AddEmailModalComponent } from './add-email-modal';
import { CourseDetailsRoutingModule } from './course-details-routing.module';
import { EmailConfirmModalComponent } from './email-confirm-modal';
import { ButtonSecondaryModule } from '../../../shared/button-secondary/button-secondary.module';
import { BaseModalModule } from '../../../shared/base-modal/base-modal.module';
import { ButtonPrimaryModule } from '../../../shared/button-primary/button-primary.module';
import { FormFieldModule } from '../../../shared/form-field/form-field.module';
import { InputModule } from '../../../shared/input/input.module';
import { NavbarAuthenticatedModule } from '../../../shared/navbar-authenticated/navbar-authenticated.module';
import { SuccessModalModule } from '../../../shared/success-modal/success-modal.module';

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
