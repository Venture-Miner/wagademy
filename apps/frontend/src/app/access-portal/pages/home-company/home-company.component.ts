import { Component, OnInit } from '@angular/core';
import { TokenService, LensService } from '../../../services';
import { ACCOUNT_TYPE } from '../../../interfaces/types';

@Component({
  selector: 'wagademy-home-company',
  templateUrl: './home-company.component.html',
  styleUrls: ['./home-company.component.css'],
})
export class HomeCompanyComponent implements OnInit {
  showDetailsModal = false;
  publications: any[] = [];

  constructor(
    private tokenService: TokenService,
    private lensService: LensService
  ) {}

  ngOnInit() {
    this.getPublications();
  }

  async getPublications() {
    try {
      const ethereumAddress = this.tokenService.getWalletAddress();
      const following = await this.lensService.client.query({
        query: this.lensService.following,
        variables: {
          request: {
            address: ethereumAddress,
            limit: 50,
          },
        },
      });
      const profileIds = following.data.following.items.map(
        ({ profile: { id } }: any) => id
      );
      const publications = await this.lensService.client.query({
        query: this.lensService.publications,
        variables: {
          request: {
            profileIds,
            publicationTypes: ['POST'],
            sources: ['Wagademy'],
            metadata: {
              tags: {
                oneOf: [ACCOUNT_TYPE.company],
              },
            },
            limit: 50,
          },
        },
      });
      this.publications = publications.data.publications.items;
    } catch (err) {
      return;
    }
  }
}
