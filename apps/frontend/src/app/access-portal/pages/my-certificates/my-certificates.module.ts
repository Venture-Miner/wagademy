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
import { CertificateModalComponent } from './components/certificate-modal/certificate-modal.component';

@NgModule({
  declarations: [
    MyCertificatesComponent,
    CertificatesCardComponent,
    CertificateModalComponent,
  ],
  imports: [
    CommonModule,
    MyCertificatesRoutingModule,
    NavbarAuthenticatedModule,
    ButtonPrimaryModule,
    InputModule,
    InputSelectModule,
    BaseModalModule,
  ],
})
export class MyCertificatesModule {}
