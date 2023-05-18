import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CreateProfileRoutingModule,
  CreateProfileComponent,
  ProfileStepComponent,
  EducationStepComponent,
  AreaOfExpertiseStepComponent,
  ProfessionalExperienceStepComponent,
  AreaOfInterestStepComponent,
  SkillsAndCompetenciesStepComponent,
  JoinSquadComponent,
} from '../../pages';
import {
  NavbarModule,
  InputModule,
  FormFieldModule,
  ButtonPrimaryModule,
  TextAreaModule,
  ButtonSecondaryModule,StepperModule
} from '../../../shared';

@NgModule({
  declarations: [
    CreateProfileComponent,
    ProfileStepComponent,
    EducationStepComponent,
    AreaOfExpertiseStepComponent,
    ProfessionalExperienceStepComponent,
    AreaOfInterestStepComponent,
    SkillsAndCompetenciesStepComponent,
    JoinSquadComponent,
  ],
  imports: [
    CommonModule,
    StepperModule,
    CreateProfileRoutingModule,
    NavbarModule,
    InputModule,
    ReactiveFormsModule,
    FormFieldModule,
    ButtonPrimaryModule,
    TextAreaModule,
    ButtonSecondaryModule,
  ],
})
export class CreateProfileModule {}
