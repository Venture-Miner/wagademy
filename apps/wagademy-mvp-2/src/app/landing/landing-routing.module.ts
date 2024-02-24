import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { CompanyComponent } from './company/company.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'student',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: 'company',
        component: CompanyComponent,
      },
      {
        path: 'student',
        component: StudentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
