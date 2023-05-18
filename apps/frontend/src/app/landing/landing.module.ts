import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BaseModalModule,
  ButtonPrimaryModule,
  ButtonSecondaryModule,
} from '../shared';
import {
  LandingRoutingModule,
  LandingComponent,
  NavbarLandingComponent,
  CardComponent,
  ResumesTogglerComponent,
  DetailsModalComponent,
  AboutComponent,
  EducationComponent,
  ProfessionalExperienceComponent,
  AreasOfExpertiseComponent,
  AreasOfInterestComponent,
  SkillsAndCompetenciesComponent,
  PersonalInfoComponent,
  SquadBannerComponent,
  AvatarsComponent,
  FooterComponent,
  RecommendationsComponent,
} from '../landing';

@NgModule({
  declarations: [
    LandingComponent,
    NavbarLandingComponent,
    CardComponent,
    ResumesTogglerComponent,
    DetailsModalComponent,
    AboutComponent,
    EducationComponent,
    ProfessionalExperienceComponent,
    AreasOfExpertiseComponent,
    AreasOfInterestComponent,
    SkillsAndCompetenciesComponent,
    PersonalInfoComponent,
    SquadBannerComponent,
    AvatarsComponent,
    FooterComponent,
    RecommendationsComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    ButtonSecondaryModule,
    ButtonPrimaryModule,
    BaseModalModule,
  ],
})
export class LandingModule {}
