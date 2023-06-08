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
      title: 'Data Analytics & ML',
      description:
        'This course provides a comprehensive understanding of data analytics and machine learning techniques. Gain knowledge of data manipulation, visualization, and predictive modeling to extract valuable insights and make data-driven decisions in various industries.',
    },
    {
      id: 2,
      title: 'Cybersecurity Fundamentals',
      description:
        'Explore the fundamental principles of cybersecurity, including threat detection, risk assessment, and incident response. Learn about common attack vectors, security controls, and best practices to protect computer systems and networks from cyber threats.',
    },
    {
      id: 3,
      title: 'Cloud Computing',
      description:
        'This course introduces the concepts and technologies of cloud computing. Learn about cloud service models, such as Infrastructure as a Service (IaaS) and Platform as a Service (PaaS), and gain practical skills in managing and deploying applications in cloud environments.',
    },
    {
      id: 4,
      title: 'Software Development',
      description:
        'Develop a strong foundation in software development methodologies and practices. Learn programming languages, software design principles, and agile development techniques to build robust and scalable software solutions, focusing on efficiency, maintainability, and user experience.',
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
