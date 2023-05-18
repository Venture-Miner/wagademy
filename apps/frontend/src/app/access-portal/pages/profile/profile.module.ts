import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonPrimaryModule } from '../../../shared/button-primary/button-primary.module';
import { NavbarAuthenticatedModule } from '../../../shared/navbar-authenticated/navbar-authenticated.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { AboutComponent } from './components/about/about.component';
import { EducationComponent } from './components/education/education.component';
import { AreasOfExpertiseComponent } from './components/areas-of-expertise/areas-of-expertise.component';
import { ProfessionalExperienceComponent } from './components/professional-experience/professional-experience.component';
import { AreasOfInterestComponent } from './components/areas-of-interest/areas-of-interest.component';
import { SkillsAndCompetenciesComponent } from './components/skills-and-competencies/skills-and-competencies.component';

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
