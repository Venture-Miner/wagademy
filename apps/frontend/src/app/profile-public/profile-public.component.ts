import { Component, OnInit } from '@angular/core';
import { LensService } from '../services';

@Component({
  selector: 'wagademy-profile-public',
  templateUrl: './profile-public.component.html',
  styleUrls: ['./profile-public.component.css'],
})
export class ProfilePublicComponent implements OnInit {
  publications: any[] = [];
  display = 3;

  constructor(private lensService: LensService) {}

  ngOnInit() {
    this.getPublications();
  }

  async getPublications() {
    try {
      const publications = await this.lensService.client.query({
        query: this.lensService.getFeed,
        variables: {
          request: {
            publicationTypes: ['POST'],
            sources: ['Wagademy'],
            limit: this.display,
            sortCriteria: 'LATEST',
            noRandomize: true,
          },
        },
      });
      const items = publications.data.explorePublications.items as [
        { metadata: { description: string; content: string } }
      ];
      this.publications = items.filter(
        (value) => value.metadata.description === 'Wagademy Certificate'
      );
    } catch (err) {
      console.log(err);
      return;
    }
  }
}
