import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { LensService, TokenService } from '../../../services';
import {
  Curriculum,
  About,
  AcademicEducation,
  Experience,
} from '../../../interfaces';

@Component({
  selector: 'wagademy-my-contacts',
  templateUrl: './my-contacts.component.html',
  styleUrls: ['./my-contacts.component.css'],
})
export class MyContactsComponent implements OnInit {
  // followModal = false;
  addRecommendationModal = false;
  form = this.fb.group({
    description: [''],
  });
  following = [];
  profilePicture: string[] = [];
  curriculum!: Curriculum;
  about!: About;
  expertise: string[] = [];
  interest: string[] = [];
  academicEducation: AcademicEducation[] = [];
  experience: Experience[] = [];
  skillsAndCompetencies: string[] = [];
  curriculums: (undefined | Curriculum)[] = [];

  constructor(
    private fb: FormBuilder,
    private tokenService: TokenService,
    private lensService: LensService
  ) {}

  async ngOnInit() {
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
      this.following = following.data.following.items;
      this.getProfileImage(this.following);
      const curriculums = this.following.map(({ profile: { id } }) =>
        this.getProfileCurriculum(id)
      );
      this.curriculums = await Promise.all(curriculums);
    } catch (err) {
      return;
    }
  }

  getProfileImage(following: any[]) {
    for (const profile of following) {
      if (!profile.picture)
        this.profilePicture.push(
          'https://lens.infura-ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX'
        );
      else {
        const url = profile.picture.original.url;
        if (url.includes('http')) this.profilePicture.push(url);
        if (url.includes('ipfs://'))
          this.profilePicture.push(
            `https://ipfs.io/ipfs/${url.split('ipfs://')[1]}`
          );
        if (url.includes('ar://'))
          this.profilePicture.push(
            `https://arweave.net/${url.split('ar://')[1]}`
          );
      }
    }
  }

  getControl(field: string) {
    return this.form.get(field) as FormControl;
  }

  async getProfileCurriculum(profileId: string) {
    const posts = await this.lensService.client.query({
      query: this.lensService.getPosts,
      variables: {
        request: {
          profileId: profileId,
          publicationTypes: ['POST'],
          metadata: { mainContentFocus: ['TEXT_ONLY'] },
        },
      },
    });
    const items = posts.data.publications.items as [
      { appId: string; metadata: { description: string; content: string } }
    ];
    const academyPosts = items.filter(
      (items) =>
        items.appId === 'academy' &&
        items.metadata.description === 'Academy Curriculum'
    );
    if (!academyPosts[0]) {
      return;
    }
    return JSON.parse(academyPosts[0].metadata.content);
  }

  getAge(dateString: any) {
    if (dateString === null) return;
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  send() {
    //
  }

  follow() {
    //
  }
}
