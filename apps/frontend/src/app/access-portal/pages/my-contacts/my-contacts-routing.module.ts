import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyContactsComponent } from './my-contacts.component';
import { AccountTypePersonGuard } from '../../../guards/account-type-person.guard';

const routes: Routes = [
  {
    path: '',
    component: MyContactsComponent,
    canActivate: [AccountTypePersonGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyContactsRoutingModule {}
