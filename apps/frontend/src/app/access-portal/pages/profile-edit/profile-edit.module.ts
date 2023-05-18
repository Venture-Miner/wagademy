import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ProfileEditRoutingModule,
  ProfileEditComponent,
  EducationEditStepComponent,
  ProfileEditStepComponent,
  ProfessionalExperienceEditStepComponent,
  AreaOfExpertiseEditStepComponent,
  AreaOfInterestEditStepComponent,
  SkillsAndCompetenciesEditStepComponent,
} from '../../pages';
import {
  ButtonPrimaryModule,
  ButtonSecondaryModule,
  FormFieldModule,
  InputModule,
  NavbarAuthenticatedModule,
  TextAreaModule,
} from '../../../shared';

@NgModule({
  declarations: [
    ProfileEditComponent,
    EducationEditStepComponent,
    ProfileEditStepComponent,
    ProfessionalExperienceEditStepComponent,
    AreaOfExpertiseEditStepComponent,
    AreaOfInterestEditStepComponent,
    SkillsAndCompetenciesEditStepComponent,
  ],
  imports: [
    CommonModule,
    ProfileEditRoutingModule,
    FormFieldModule,
    ButtonPrimaryModule,
    ButtonSecondaryModule,
    ReactiveFormsModule,
    InputModule,
    NavbarAuthenticatedModule,
    TextAreaModule,
  ],
})
export class ProfileEditModule {}
