import { NgModule } from '@angular/core';
import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { NgOptimizedImage } from '@angular/common';

@NgModule({
  declarations: [StudentComponent],
  imports: [StudentRoutingModule, NgOptimizedImage],
})
export class StudentModule {}
