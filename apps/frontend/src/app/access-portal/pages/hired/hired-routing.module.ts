import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HiredComponent } from './hired.component';

const routes: Routes = [
  {
    path: '',
    component: HiredComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HiredRoutingModule {}
