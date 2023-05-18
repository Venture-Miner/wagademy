import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarAuthenticatedModule } from '../../../shared/navbar-authenticated/navbar-authenticated.module';
import { CourseDetailsInfoRoutingModule } from './course-details-info-routing.module';
import { CourseDetailsInfoComponent } from './course-details-info.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { AboutCourseComponent } from './components/about/about.component';
import { TeacherEducationComponent } from './components/education/education.component';
import { TeacherProfessionalExperienceComponent } from './components/professional-experience/professional-experience.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';

@NgModule({
  declarations: [
    CourseDetailsInfoComponent,
    PersonalInfoComponent,
    AboutCourseComponent,
    TeacherEducationComponent,
    TeacherProfessionalExperienceComponent,
    RecommendationsComponent,
  ],
  imports: [
    CommonModule,
    CourseDetailsInfoRoutingModule,
    NavbarAuthenticatedModule,
  ],
})
export class CourseDetailsInfoModule {}
