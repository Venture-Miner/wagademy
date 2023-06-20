import { Component } from '@angular/core';
import { LensService, TokenService } from '../services';

@Component({
  selector: 'wagademy-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  selectedBlock: 'STUDENTS' | 'SQUADS' = 'STUDENTS';
  detailsModalType: 'SQUAD' | 'RESUME' | 'TEACHER' | null = null;
  detailsModalData: any = null;
  publications: any[] = [];
  students = [
    {
      avatarURL: './../../../assets/img/bianca-caetano.jpg',
      name: 'Bianca Caetano',
      email: 'bruninhakjurugat11@gmail.com',
      dateOfBirth: '18/09/2000',
      contactNumber: '+55 37 912345678',
      country: 'Brazil',
      state: 'Minas Gerais',
      about: 'Full Stack Developer at Venture Miner',
      academicEducation: [
        {
          education: 'Descomplica',
          course: 'Computer Science',
          description:
            'This course equips us with the necessary skills to develop a wide range of programs, starting from basic control software and extending to complex information processing systems, such as inventories and more',
        },
      ],
      expertise: ['Full Stack', 'Frontend', 'Backend'],
      experiences: [
        {
          company: 'Venture Miner',
          job: 'Full Stack Developer',
          description:
            'As a full-stack developer, my job involves handling both the front-end and back-end aspects of web development',
        },
      ],
      interests: ['Full Stack', 'Frontend', 'Backend'],
      skillsAndCompetencies: [
        'NestJS',
        'Angular',
        'NodeJS',
        'Tailwind',
        'Typescript',
        'Ethereum',
        'AWS Web Services',
        'MongoDB',
        'Prisma',
        'HTML',
      ],
    },
    {
      avatarURL: './../../../assets/img/eliane-felix.jpg',
      name: 'Eliane Félix',
      email: 'elianearaujo51@gmail.com',
      dateOfBirth: '',
      contactNumber: '+55 11 912345678',
      country: 'Brazil',
      state: 'São Paulo',
      about: 'UI/UX Designer at Venture Miner',
      academicEducation: [
        {
          education: 'Uninove',
          course: 'Marketing',
          description: '',
        },
      ],
      expertise: [
        'UX/UI Designer',
        'Product Designer',
        'UI Designer',
        'Visual Designer',
      ],
      experiences: [
        {
          company: 'Venture Miner',
          job: 'UX/UI Designer',
          description: '',
        },
      ],
      interests: [
        'UX/UI Design',
        'Product Design',
        'UI Design',
        'Visual Design',
      ],
      skillsAndCompetencies: ['Group Work', 'Agility', 'Proactivity'],
    },
    {
      avatarURL: './../../../assets/img/clara-felix.jpg',
      name: 'Clara Patrícia Felix',
      email: 'clara.patriciafelix@hotmail.com',
      dateOfBirth: '09/03/1997',
      contactNumber: '+55 84 912345678',
      country: 'Brazil',
      state: 'Rio Grande do Norte',
      about: 'Frontend Developer at Venture Miner',
      academicEducation: [
        {
          education: 'Universidade Federal do Rio Grande do Norte',
          course: 'Information System',
          description:
            'The Bachelor of Information Systems is a professional who will use concepts and techniques of informatics and systems theory to contribute to the solution of information treatment problems in organizations through the construction of automation models corporate',
        },
      ],
      expertise: ['Typescript', 'Angular', 'Bootstrap', 'Tailwind'],
      experiences: [
        {
          company: 'Venture Miner',
          job: 'Software Developer',
          description:
            'Design and development of user interfaces, elaboration of user journey and Frontend coding using Typescript/Angular/Bootstrap/Tailwind',
        },
      ],
      interests: [],
      skillsAndCompetencies: ['Typescript', 'Angular', 'Bootstrap', 'Tailwind'],
    },
    {
      avatarURL: './../../../assets/img/gabriel-saraiva.jpg',
      name: 'Gabriel Saraiva',
      email: 'gabrielmsaraiva@outlook.com',
      dateOfBirth: '06/09/1999',
      contactNumber: '+55 37 912345678',
      country: 'Brazil',
      state: 'Minas Gerais',
      about: 'Frontend Developer at Venture Miner',
      academicEducation: [
        {
          education: '',
          course: '',
          description: '',
        },
      ],
      expertise: [
        'Javascript',
        'Data Structures and Algorithms',
        'Web Development',
      ],
      experiences: [
        {
          company: 'Venture Miner',
          job: 'Full Stack Developer',
          description: 'UX and UI development',
        },
      ],
      interests: ['Software Development'],
      skillsAndCompetencies: [
        'Problem Solving',
        'Teamwork',
        'Adaptability',
        'Empathy',
        'Patience',
        'Curiosity',
      ],
    },
  ];
  teachers = [
    {
      avatarURL: './../../../assets/img/matheus-daros.jpg',
      name: 'Matheus Darós Pagani',
      email: 'matheus@ventureminer.com',
      dateOfBirth: '',
      contactNumber: '',
      country: 'Brazil',
      state: 'Espírito Santo',
      about: 'CEO at BFT Solutions | Co-founder at Venture Miner ',
      academicEducation: [
        {
          education: 'Universidade Federal do Espírito Santo',
          course:
            'Master in Mechanical Engineering, Mathematical and Computational Methods applied to Science and Engineering',
          description: '',
        },
      ],
      experiences: [
        {
          company: 'Venture Miner',
          job: 'CEO',
          description: '',
        },
      ],
      recommendations: [
        {
          avatarURL: './../../../assets/img/eduardo-broetto.jpg',
          userName: 'Eduardo Broetto',
          date: '10/05/2023',
          recommendation:
            'The professor is highly qualified and has extensive experience in blockchain technology. He is able to present complex concepts in a clear and objective way, making learning much easier and more enjoyable for students',
        },
        {
          avatarURL: './../../../assets/img/bianca-caetano.jpg',
          userName: 'Bianca Caetano',
          date: '10/05/2023',
          recommendation:
            "I really appreciate Matheus's teaching style. His ability to convey knowledge is impressive, and he demonstrate a deep understanding of the subject matter. Additionally, he is highly articulate, making the classes engaging and easy to follow",
        },
        {
          avatarURL: './../../../assets/img/gabriel-saraiva.jpg',
          userName: 'Gabriel Saraiva',
          date: '10/05/2023',
          recommendation:
            'He has a vast knowledge of the field, is passionate about the subject and has an uncanny ability to simplify complex concepts so that all students can understand',
        },
      ],
    },
  ];
  teams = [
    {
      avatarURL: 'https://i.pravatar.cc/300',
      name: 'Team 1',
      about:
        'Highly skilled professional in Data Analytics, bringing extensive experience in statistical analysis and data modeling. With expertise in various analytics tools, his ability to translate complex data into actionable insights makes him a valuable asset for data-driven organizations.',
    },
  ];
  publication: any[] = [];
  display = 3;

  constructor(private lensService: LensService) {}

  ngOnInit() {
    this.getPublications();
  }

  async getPublications() {
    try {
      const publications = await this.lensService.client.query({
        query: this.lensService.getPosts,
        variables: {
          request: {
            publicationTypes: ['POST'],
            sources: ['Wagademy'],
            limit: this.display,
          },
        },
      });
      this.publications = publications.data.publications.items;
    } catch (err) {
      console.log(err);
      return;
    }
  }
}
