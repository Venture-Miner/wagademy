import { Component, OnInit } from '@angular/core';
import { LensService } from '../services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'wagademy-profile-public',
  templateUrl: './profile-public.component.html',
  styleUrls: ['./profile-public.component.css'],
})
export class ProfilePublicComponent implements OnInit {
  publications: any[] = [];
  display = 3;
  id = '';
  isLoading = false;
  routerNavbar = this.router.url === '/home/profile-public';
  profileId: string | null = null;
  reactionRequest: { profileId: string } | null = null;

  constructor(
    private lensService: LensService,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const id = params.get('id');
      if (id) this.id = id;
    });
    this.getProfilePublications();
  }

  async getProfilePublications() {
    try {
      const publications = await this.lensService.client.query({
        query: this.lensService.getProfileFeed,
        variables: {
          request: {
            publicationTypes: ['POST'],
            sources: ['Wagademy'],
            limit: this.display,
            profileId: this.id,
          },
          profileId: this.profileId,
          reactionRequest: this.reactionRequest,
        },
      });
      const items = publications.data.publications.items as [
        {
          profile: {
            id: string;
            name: string;
            handle: string;
            stats: { totalFollowers: number; totalFollowing: number };
            picture: {
              original: {
                url: string;
              };
            };
            coverPicture: {
              original: {
                url: string;
              };
            };
          };
          metadata: { description: string; content: string };
          createdAt: string;
        }
      ];
      this.publications = items.filter(
        (value) => value.metadata.description === 'Wagademy Certificate'
      );
      console.log(this.publications[0].profile);
    } catch (err) {
      console.log(err);
      return;
    }
  }
}
