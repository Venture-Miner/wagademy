import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CreateCompanyProfileRoutingModule,
  CreateCompanyProfileComponent,
  CompanyProfileStepComponent,
  InterestStepComponent,
} from '../../pages';
import {
  NavbarModule,
  InputModule,
  FormFieldModule,
  ButtonPrimaryModule,
  TextAreaModule,
  ButtonSecondaryModule,
  StepperModule,
} from '../../../shared';

@NgModule({
  declarations: [
    CreateCompanyProfileComponent,
    CompanyProfileStepComponent,
    InterestStepComponent,
  ],
  imports: [
    CommonModule,
    StepperModule,
    CreateCompanyProfileRoutingModule,
    NavbarModule,
    InputModule,
    ReactiveFormsModule,
    FormFieldModule,
    ButtonPrimaryModule,
    TextAreaModule,
    ButtonSecondaryModule,
  ],
})
export class CreateCompanyProfileModule {}
