import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ProfileRoutingModule,
  ProfileComponent,
  AboutComponent,
  EducationComponent,
  AreasOfExpertiseComponent,
  ProfessionalExperienceComponent,
  AreasOfInterestComponent,
  SkillsAndCompetenciesComponent,
} from '../../pages';
import {
  ButtonPrimaryModule,
  NavbarAuthenticatedModule,
} from '../../../shared';

@NgModule({
  declarations: [
    ProfileComponent,
    AboutComponent,
    EducationComponent,
    AreasOfExpertiseComponent,
    ProfessionalExperienceComponent,
    AreasOfInterestComponent,
    SkillsAndCompetenciesComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NavbarAuthenticatedModule,
    ButtonPrimaryModule,
  ],
})
export class ProfileModule {}
