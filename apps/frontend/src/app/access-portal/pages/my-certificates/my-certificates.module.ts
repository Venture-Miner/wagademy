import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModalModule } from '../../../shared/base-modal/base-modal.module';
import { ButtonPrimaryModule } from '../../../shared/button-primary/button-primary.module';
import { InputModule } from '../../../shared/input/input.module';
import { InputSelectModule } from '../../../shared/input-select/input-select.module';
import { NavbarAuthenticatedModule } from '../../../shared/navbar-authenticated/navbar-authenticated.module';
import { MyCertificatesRoutingModule } from './my-certificates-routing.module';
import { MyCertificatesComponent } from './my-certificates.component';
import { CertificatesCardComponent } from './components/certificates-card/certificates-card.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MyCertificatesComponent, CertificatesCardComponent],
  imports: [
    CommonModule,
    MyCertificatesRoutingModule,
    NavbarAuthenticatedModule,
    ButtonPrimaryModule,
    InputModule,
    InputSelectModule,
    BaseModalModule,
    ReactiveFormsModule,
  ],
})
export class MyCertificatesModule {}
