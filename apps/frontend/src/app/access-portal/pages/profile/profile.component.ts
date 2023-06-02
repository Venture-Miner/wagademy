import {
  About,
  AcademicEducation,
  Curriculum,
  Experience,
} from '../../../interfaces/types';
import { Component, OnInit } from '@angular/core';
import { LensService } from '../../../services/lens/lens.service';
import { TokenService } from '../../../services/token/token.service';

@Component({
  selector: 'wagademy-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  completed = false;
  profileId = '';
  curriculum!: Curriculum;
  about!: About;
  expertise: string[] = [];
  interest: string[] = [];
  academicEducation: AcademicEducation[] = [];
  experience: Experience[] = [];
  skillsAndCompetencies: string[] = [];

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
    this.profileId = id;
    this.getProfileCurriculum();

    if (
      this.academicEducation.length &&
      !Object.values(this.academicEducation[0]).every((el) => !el) &&
      this.experience.length &&
      !Object.values(this.experience[0]).every((el) => !el) &&
      this.about &&
      !Object.values(this.about).every((el) => !el) &&
      this.expertise.length === 10 &&
      this.skillsAndCompetencies.length === 10 &&
      this.interest.length === 10
    ) {
      this.completed = true;
    }
  }

  async getProfileCurriculum() {
    const posts = await this.lensService.client.query({
      query: this.lensService.getPosts,
      variables: {
        request: {
          profileId: this.profileId,
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
    if (!academyPosts[0]) return;
    this.curriculum = JSON.parse(academyPosts[0].metadata.content);
    this.setProfileComponentsData();
  }

  setProfileComponentsData() {
    const {
      about,
      academicEducation,
      cellphone,
      country,
      dateOfBirth,
      email,
      experience,
      expertise,
      interest,
      name,
      skillsAndCompetencies,
      state,
    } = this.curriculum;
    this.about = {
      about,
      cellphone,
      country,
      dateOfBirth,
      email,
      name,
      state,
    };
    this.expertise = expertise;
    this.interest = interest;
    this.academicEducation = academicEducation;
    this.experience = experience;
    this.skillsAndCompetencies = skillsAndCompetencies;
  }
}
