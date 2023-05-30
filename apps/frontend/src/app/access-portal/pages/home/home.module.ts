import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from '../../../shared/input/input.module';
import { InputSelectModule } from '../../../shared/input-select/input-select.module';
import { NavbarAuthenticatedModule } from '../../../shared/navbar-authenticated/navbar-authenticated.module';
import { PaginationModule } from '../../../shared/pagination/pagination.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FriendCardComponent } from './components/friend-card/friend-card.component';
import { JobCardComponent } from './components/job-card/job-card.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { WidgetModule } from '../../../shared/widget/widget.module';

@NgModule({
  declarations: [
    HomeComponent,
    FriendCardComponent,
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
    WidgetModule,
  ],
})
export class HomeModule {}
