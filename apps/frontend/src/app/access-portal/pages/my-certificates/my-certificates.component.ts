import { Component, HostListener, OnInit } from '@angular/core';
import {
  CertificateService,
  LensService,
  TokenService,
} from '../../../services';

@Component({
  selector: 'lens-academy-my-certificates',
  templateUrl: './my-certificates.component.html',
  styleUrls: ['./my-certificates.component.css'],
})
export class MyCertificatesComponent implements OnInit {
  exhibitionStyle = 'grid';
  myCertificateModal = false;
  certificates: any[] = [];
  courseToClaim: { courseName: string; publicationId: string } = {} as {
    courseName: string;
    publicationId: string;
  };
  isLoading = false;
  profileId = '';

  constructor(
    private lensService: LensService,
    private tokenService: TokenService,
    private certificateService: CertificateService
  ) {}

  async ngOnInit() {
    const ethereumAddress = this.tokenService.getWalletAddress();
    const {
      data: {
        defaultProfile: { id },
      },
    } = await this.lensService.client.query({
      query: this.lensService.defaultProfileId,
      variables: {
        request: { ethereumAddress },
      },
    });
    this.profileId = id;
    this.getCertificates();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 640) {
      this.exhibitionStyle = 'grid';
    }
  }

  async getCertificates() {
    const posts = await this.lensService.client.query({
      query: this.lensService.getPosts,
      variables: {
        request: {
          profileId: this.profileId,
          publicationTypes: ['POST'],
          metadata: { mainContentFocus: ['IMAGE'] },
        },
      },
    });
    const items = posts.data.publications.items;
    this.certificates = items
      .filter(
        (item: any) =>
          item.appId === 'academy' &&
          item.metadata.description === 'Academy Certificate'
      )
      .filter(({ metadata }: any) => {
        try {
          const parsedAttr = JSON.parse(metadata?.attributes[0]?.value || '{}');
          return (
            parsedAttr.participant &&
            parsedAttr.courseName &&
            parsedAttr.conductor
          );
        } catch (e) {
          return false;
        }
      });
  }

  toggleMyCertificateModal() {
    this.myCertificateModal = !this.myCertificateModal;
  }

  async claimCertificate(publicationId: string) {
    this.isLoading = true;
    const tx = await this.certificateService
      .claimCertificate(publicationId)
      .catch(() => {
        this.isLoading = false;
      });
    tx.wait().then(() => {
      this.isLoading = false;
      this.toggleMyCertificateModal();
    });
  }
}
