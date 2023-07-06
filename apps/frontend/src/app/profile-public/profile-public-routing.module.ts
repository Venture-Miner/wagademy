import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePublicComponent } from './profile-public.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePublicComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePublicRoutingModule {}
