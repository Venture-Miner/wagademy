import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  SquadsComponent,
  SquadsRoutingModule,
  CardComponent,
  ParticipantsComponent,
} from '../../../access-portal';
import {
  ButtonPrimaryModule,
  InputModule,
  NavbarModule,
  ButtonSecondaryModule,
  BaseModalModule,
  FormFieldModule,
  WarningModalModule,
  SuccessModalModule,
} from '../../../shared';

@NgModule({
  declarations: [SquadsComponent, CardComponent, ParticipantsComponent],
  imports: [
    CommonModule,
    SquadsRoutingModule,
    InputModule,
    ButtonPrimaryModule,
    NavbarModule,
    ButtonSecondaryModule,
    BaseModalModule,
    FormFieldModule,
    ReactiveFormsModule,
    WarningModalModule,
    SuccessModalModule,
  ],
})
export class SquadsModule {}
