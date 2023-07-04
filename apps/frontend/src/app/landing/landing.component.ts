import { Component, OnInit } from '@angular/core';
import { LensService } from '../services';

@Component({
  selector: 'wagademy-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  selectedBlock: 'STUDENTS' | 'SQUADS' = 'STUDENTS';
  detailsModalType: 'SQUAD' | 'RESUME' | 'TEACHER' | null = null;
  detailsModalData: any = null;
  publications: any[] = [];
  publication: any[] = [];
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
