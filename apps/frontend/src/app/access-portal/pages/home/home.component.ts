import { Component, OnInit } from '@angular/core';
import { LensService, TokenService } from '../../../services';

@Component({
  selector: 'wagademy-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  publications: any[] = [];
  display = 3;
  courses = [
    {
      id: 1,
      title: 'Data Scientist',
      description:
        'Utilize advanced analytics techniques to extract insights from vast datasets, develop machine learning models, and make data-driven decisions to solve complex business problems and optimize processes.',
    },
    {
      id: 2,
      title: 'Cybersecurity Analyst',
      description:
        'Protect systems, networks, and data from security threats by monitoring, detecting, and responding to incidents, conducting vulnerability assessments, and implementing security controls to ensure the integrity and confidentiality of information.',
    },
    {
      id: 3,
      title: 'Cloud Solutions Architect',
      description:
        'Design and implement scalable and secure cloud-based solutions, leveraging infrastructure and platform services, to meet business requirements. Ensure reliability, performance, and cost-efficiency while leveraging the benefits of cloud computing technologies.',
    },
    {
      id: 4,
      title: 'Software Engineer',
      description:
        'Develop high-quality software solutions by analyzing requirements, designing, coding, testing, and maintaining software applications. Collaborate with cross-functional teams, follow software engineering best practices, and stay updated with emerging technologies to deliver innovative and robust software products.',
    },
  ];
  jobs = [
    {
      id: 1,
      title: 'Data Scientist',
      description:
        'Utilize advanced analytics techniques to extract insights from vast datasets, develop machine learning models, and make data-driven decisions to solve complex business problems and optimize processes.',
    },
    {
      id: 2,
      title: 'Cybersecurity Analyst',
      description:
        'Protect systems, networks, and data from security threats by monitoring, detecting, and responding to incidents, conducting vulnerability assessments, and implementing security controls to ensure the integrity and confidentiality of information.',
    },
    {
      id: 3,
      title: 'Cloud Solutions Architect',
      description:
        'Design and implement scalable and secure cloud-based solutions, leveraging infrastructure and platform services, to meet business requirements. Ensure reliability, performance, and cost-efficiency while leveraging the benefits of cloud computing technologies.',
    },
    {
      id: 4,
      title: 'Software Engineer',
      description:
        'Develop high-quality software solutions by analyzing requirements, designing, coding, testing, and maintaining software applications. Collaborate with cross-functional teams, follow software engineering best practices, and stay updated with emerging technologies to deliver innovative and robust software products.',
    },
  ];

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
