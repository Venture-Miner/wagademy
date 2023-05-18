import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HomeRoutingModule,
  HomeComponent,
  FriendCardComponent,
  WidgetComponent,
  JobCardComponent,
  CourseCardComponent,
} from '@/access-portal';
import {
  InputModule,
  NavbarAuthenticatedModule,
  InputSelectModule,
  PaginationModule,
} from '@/shared';

@NgModule({
  declarations: [
    HomeComponent,
    FriendCardComponent,
    WidgetComponent,
    JobCardComponent,
    CourseCardComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NavbarAuthenticatedModule,
    InputModule,
    InputSelectModule,
    PaginationModule,
  ],
})
export class HomeModule {}
