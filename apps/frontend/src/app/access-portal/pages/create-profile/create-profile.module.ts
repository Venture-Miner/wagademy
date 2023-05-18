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
import { AreaOfExpertiseStepComponent } from './area-of-expertise-step/area-of-expertise-step.component';
import { AreaOfInterestStepComponent } from './area-of-interest-step/area-of-interest-step.component';
import { CreateProfileRoutingModule } from './create-profile-routing.module';
import { CreateProfileComponent } from './create-profile.component';
import { EducationStepComponent } from './education-step/education-step.component';
import { JoinSquadComponent } from './join-squad/join-squad.component';
import { ProfessionalExperienceStepComponent } from './professional-experience-step/professional-experience-step.component';
import { ProfileStepComponent } from './profile-step/profile-step.component';
import { SkillsAndCompetenciesStepComponent } from './skills-and-competencies-step/skills-and-competencies-step.component';

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
