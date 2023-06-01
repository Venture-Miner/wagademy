import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AccountTypePersonGuard } from '../../../guards/account-type-person.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AccountTypePersonGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
