import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseModalModule } from '../../../shared/base-modal/base-modal.module';
import { ButtonPrimaryModule } from '../../../shared/button-primary/button-primary.module';
import { ButtonSecondaryModule } from '../../../shared/button-secondary/button-secondary.module';
import { FormFieldModule } from '../../../shared/form-field/form-field.module';
import { InputModule } from '../../../shared/input/input.module';
import { NavbarModule } from '../../../shared/navbar/navbar.module';
import { SuccessModalModule } from '../../../shared/success-modal/success-modal.module';
import { WarningModalModule } from '../../../shared/warning-modal/warning-modal.module';
import { CardComponent } from './card/card.component';
import { ParticipantsComponent } from './participants/participants.component';
import { SquadsRoutingModule } from './squads-routing.module';
import { SquadsComponent } from './squads.component';

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
