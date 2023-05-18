import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ProfileEditRoutingModule,
  ProfileEditComponent,
  EducationEditStepComponent,
  ProfileEditStepComponent,
  ProfessionalExperienceEditStepComponent,
  AreaOfExpertiseEditStepComponent,
  AreaOfInterestEditStepComponent,
  SkillsAndCompetenciesEditStepComponent,
} from '@/access-portal';
import {
  ButtonPrimaryModule,
  ButtonSecondaryModule,
  FormFieldModule,
  InputModule,
  NavbarAuthenticatedModule,
  TextAreaModule,
} from '@/shared';
import { ReactiveFormsModule } from '@angular/forms';

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
