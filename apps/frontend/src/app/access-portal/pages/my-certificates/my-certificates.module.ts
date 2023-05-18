import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BaseModalModule,
  ButtonPrimaryModule,
  InputModule,
  InputSelectModule,
  NavbarAuthenticatedModule,
} from '@/shared';
import {
  MyCertificatesRoutingModule,
  MyCertificatesComponent,
  CertificatesCardComponent,
  CertificateModalComponent,
} from '@/access-portal';

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
