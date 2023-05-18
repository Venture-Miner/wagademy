import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CourseDetailsInfoRoutingModule,
  CourseDetailsInfoComponent,
  PersonalInfoComponent,
  AboutCourseComponent,
  TeacherEducationComponent,
  TeacherProfessionalExperienceComponent,
  RecommendationsComponent,
} from '@/access-portal';
import { NavbarAuthenticatedModule } from '@/shared';

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
