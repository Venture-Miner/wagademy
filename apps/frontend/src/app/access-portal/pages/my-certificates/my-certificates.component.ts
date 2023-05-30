import { Component, HostListener, OnInit } from '@angular/core';
import { LensService, TokenService } from '../../../services';

@Component({
  selector: 'lens-academy-my-certificates',
  templateUrl: './my-certificates.component.html',
  styleUrls: ['./my-certificates.component.css'],
})
export class MyCertificatesComponent implements OnInit {
  exhibitionStyle = 'grid';
  myCertificateModal = false;
  claimedCertificateModal = false;
  certificates: any[] = [];

  constructor(
    private lensService: LensService,
    private tokenService: TokenService
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
    const posts = await this.lensService.client.query({
      query: this.lensService.getPosts,
      variables: {
        request: {
          profileId: id,
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
      .map((item: any) => item.metadata)
      .filter((item: any) => {
        try {
          const parsedAttr = JSON.parse(item?.attributes[0]?.value || '{}');
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
