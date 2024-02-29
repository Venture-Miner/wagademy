import { NgModule } from '@angular/core';
import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';

@NgModule({
  declarations: [StudentComponent],
  imports: [StudentRoutingModule],
  providers: [],
})
export class StudentModule {}
