import { Component } from '@angular/core';

@Component({
  selector: 'wagademy-hired',
  templateUrl: './hired.component.html',
  styleUrls: ['./hired.component.css'],
})
export class HiredComponent {
  jobs = [
    {
      title: 'Software Enginee',
      description:
        'Develop and maintain software applications, utilizing programming languages and frameworks to meet business requirements.',
    },
    {
      title: 'Data Analyst',
      description:
        'Analyze and interpret complex data sets, providing valuable insights and actionable recommendations.',
    },
    {
      title: 'Network Administrator',
      description:
        'Manage and maintain computer networks, ensuring optimal performance, security, and availability.',
    },
    {
      title: 'UX/UI Designer',
      description:
        'Create intuitive and visually appealing user interfaces, optimizing user experience and engagement.',
    },
  ];
  squads = [
    {
      title: 'Cybersecurity Analyst',
      description:
        'Monitor and respond to security incidents, implement preventive measures, and conduct vulnerability assessments.',
    },
    {
      title: 'Cloud Architect',
      description:
        'Design and implement cloud-based solutions, leveraging platforms like AWS, Azure, or Google Cloud.',
    },
    {
      title: 'AI/Machine Learning Engineer',
      description:
        'Develop and deploy machine learning algorithms and models for data analysis and automation.',
    },
    {
      title: 'Full Stack Developer',
      description:
        'Build end-to-end web applications, working with both front-end and back-end technologies.',
    },
  ];
}
