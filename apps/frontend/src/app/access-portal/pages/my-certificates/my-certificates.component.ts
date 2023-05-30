import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'lens-academy-my-certificates',
  templateUrl: './my-certificates.component.html',
  styleUrls: ['./my-certificates.component.css'],
})
export class MyCertificatesComponent {
  exhibitionStyle = 'grid';
  myCertificateModal = false;
  claimedCertificateModal = false;

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 640) {
      this.exhibitionStyle = 'grid';
    }
  }

  toggleMyCertificateModal() {
    this.myCertificateModal = !this.myCertificateModal;
  }

  toggleClaimedCertificateModal() {
    this.myCertificateModal = false;
    this.claimedCertificateModal = !this.claimedCertificateModal;
  }
}
