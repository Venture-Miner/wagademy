import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonPrimaryModule } from '../../../shared/button-primary/button-primary.module';
import { ButtonSecondaryModule } from '../../../shared/button-secondary/button-secondary.module';
import { FormFieldModule } from '../../../shared/form-field/form-field.module';
import { InputModule } from '../../../shared/input/input.module';
import { NavbarModule } from '../../../shared/navbar/navbar.module';
import { StepperModule } from '../../../shared/stepper/stepper.module';
import { TextAreaModule } from '../../../shared/text-area/text-area.module';
import { CompanyProfileStepComponent } from './company-profile-step/company-profile-step.component';
import { CreateCompanyProfileRoutingModule } from './create-company-profile-routing.module';
import { CreateCompanyProfileComponent } from './create-company-profile.component';
import { InterestStepComponent } from './interest-step/interest-step.component';

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
