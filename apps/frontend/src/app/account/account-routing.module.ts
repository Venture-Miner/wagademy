import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { SelectProfileComponent } from './select-profile/select-profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'select-profile',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'select-profile',
        component: SelectProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
