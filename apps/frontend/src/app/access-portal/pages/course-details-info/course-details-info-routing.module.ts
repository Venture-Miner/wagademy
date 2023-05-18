import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsInfoComponent } from './course-details-info.component';

const routes: Routes = [
  {
    path: '',
    component: CourseDetailsInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseDetailsInfoRoutingModule {}
