import { Component, OnInit } from '@angular/core';
import { LensService, TokenService } from '../../../services';

@Component({
  selector: 'lens-academy-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  publications: any[] = [];
  display = 3;

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
            sources: ['Academy'],
            limit: this.display,
          },
        },
      });
      this.publications = publications.data.publications.items;
    } catch (err) {
      return;
    }
  }
}
