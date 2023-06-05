import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from '../../../shared/input/input.module';
import { InputSelectModule } from '../../../shared/input-select/input-select.module';
import { NavbarAuthenticatedModule } from '../../../shared/navbar-authenticated/navbar-authenticated.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { WidgetModule } from '../../../shared/widget/widget.module';
import { PostCardComponent } from './components';

@NgModule({
  declarations: [HomeComponent, CourseCardComponent, PostCardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NavbarAuthenticatedModule,
    InputModule,
    InputSelectModule,
    WidgetModule,
  ],
})
export class HomeModule {}
