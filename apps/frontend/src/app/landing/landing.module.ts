import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModalModule } from '../shared/base-modal/base-modal.module';
import { ButtonPrimaryModule } from '../shared/button-primary/button-primary.module';
import { ButtonSecondaryModule } from '../shared/button-secondary/button-secondary.module';
import { CardComponent } from './card/card.component';
import { FooterComponent } from './footer/footer.component';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { ResumesTogglerComponent } from './resumes-toggler/resumes-toggler.component';
import { AboutComponent } from './details-modal/about/about.component';
import { EducationComponent } from './details-modal/education/education.component';
import { AreasOfExpertiseComponent } from './details-modal/areas-of-expertise/areas-of-expertise.component';
import { AreasOfInterestComponent } from './details-modal/areas-of-interest/areas-of-interest.component';
import { SkillsAndCompetenciesComponent } from './details-modal/skills-and-competencies/skills-and-competencies.component';
import { PersonalInfoComponent as PersonalInfoComponentLanding } from './details-modal/personal-info/personal-info.component';
import { SquadBannerComponent } from './details-modal/squad-banner/squad-banner.component';
import { DetailsModalComponent } from './details-modal/details-modal.component';
import { RecommendationsComponent } from './details-modal/recommendations/recommendations.component';
import { AvatarsComponent } from './details-modal/avatars/avatars.component';
import { ProfessionalExperienceComponent } from './details-modal/professional-experience/professional-experience.component';
import { NavbarLandingModule } from './navbar-landing/navbar-landing.module';

@NgModule({
  declarations: [
    LandingComponent,
    CardComponent,
    ResumesTogglerComponent,
    DetailsModalComponent,
    AboutComponent,
    EducationComponent,
    ProfessionalExperienceComponent,
    AreasOfExpertiseComponent,
    AreasOfInterestComponent,
    SkillsAndCompetenciesComponent,
    PersonalInfoComponentLanding,
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
    NavbarLandingModule,
  ],
})
export class LandingModule {}
