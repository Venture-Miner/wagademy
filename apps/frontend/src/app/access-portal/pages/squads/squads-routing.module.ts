import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SquadsComponent } from './squads.component';

const routes: Routes = [
  {
    path: '',
    component: SquadsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SquadsRoutingModule {}
