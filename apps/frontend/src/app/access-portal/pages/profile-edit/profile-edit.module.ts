import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonPrimaryModule } from '../../../shared/button-primary/button-primary.module';
import { ButtonSecondaryModule } from '../../../shared/button-secondary/button-secondary.module';
import { FormFieldModule } from '../../../shared/form-field/form-field.module';
import { InputModule } from '../../../shared/input/input.module';
import { NavbarAuthenticatedModule } from '../../../shared/navbar-authenticated/navbar-authenticated.module';
import { TextAreaModule } from '../../../shared/text-area/text-area.module';
import { AreaOfExpertiseEditStepComponent } from './area-of-expertise-step/area-of-expertise-step.component';
import { AreaOfInterestEditStepComponent } from './area-of-interest-step/area-of-interest-step.component';
import { EducationEditStepComponent } from './education-step/education-step.component';
import { ProfessionalExperienceEditStepComponent } from './professional-experience-step/professional-experience-step.component';
import { ProfileEditRoutingModule } from './profile-edit-routing.module';
import { ProfileEditComponent } from './profile-edit.component';
import { ProfileEditStepComponent } from './profile-step/profile-step.component';
import { SkillsAndCompetenciesEditStepComponent } from './skills-and-competencies-step/skills-and-competencies-step.component';

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
