import { Component, HostListener, OnInit } from '@angular/core';
import {
  CertificateService,
  LensService,
  TokenService,
} from '../../../services';
import { FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'wagademy-my-certificates',
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
  form = this.fb.group({
    search: [''],
  });
  filteredCertificates: any[] = [];

  constructor(
    private lensService: LensService,
    private tokenService: TokenService,
    private certificateService: CertificateService,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    this.form.valueChanges.pipe(debounceTime(600)).subscribe(({ search }) => {
      this.filteredCertificates = this.certificates.filter(({ metadata }) => {
        const { participant, courseName, conductor } = JSON.parse(
          metadata?.attributes[0]?.value || '{}'
        );
        if (search) search = search.toLowerCase();
        return (
          participant.toLowerCase().includes(search) ||
          courseName.toLowerCase().includes(search) ||
          conductor.toLowerCase().includes(search)
        );
      });
    });
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
    this.filteredCertificates = this.certificates;
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
