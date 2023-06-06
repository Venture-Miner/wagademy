import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'wagademy-course-details-info',
  templateUrl: './course-details-info.component.html',
  styleUrls: ['./course-details-info.component.css'],
})
export class CourseDetailsInfoComponent implements OnInit {
  coursesInfo = [];
  courses = [
    {
      id: 1,
      title: 'Ethan Wilson',
      email: 'ethanwilson@gmail.com',
      date: '14/12/1995',
      country: 'United Kingdom',
      city: 'London',
      phone: '+44 1234 567891',
      education: 'University of Technology',
      degree: 'Masters in Data Science and Analytics',
      company: 'Data Insights Inc.',
      job: 'Data Scientist',
      descriptionJob:
        'As a Data Scientist, this person is responsible for conducting advanced data analysis, developing predictive models, and identifying insights to drive data-driven decision making.',
      description:
        'This course covers the theoretical and practical fundamentals of data analysis and machine learning. Students acquire advanced skills in Python, statistics, and machine learning algorithms.',
      info: 'Experienced professor in Data Analytics & ML, providing a clear and practical approach to teaching. ',
      recommendations:
        'Ethan is an exceptional Data Analytics & ML instructor. His deep knowledge and ability to explain complex concepts in a clear and engaging manner make him a valuable asset to any learning environment.',
      recommendationsName: 'Emma Johnson',
      dateRecommendation: '04/24/2023',
    },
    {
      id: 2,
      title: 'Oliver Harris',
      email: 'oliverharris@gmail.com',
      date: ' 22/02/1990',
      country: 'Canada',
      city: 'Vancouver',
      phone: '+1 123 456 7890',
      education: 'CyberTech University',
      degree: 'Masters in Cybersecurity and Digital Forensics',
      company: 'SecureCyber Solutions',
      job: 'Cybersecurity Analyst',
      descriptionJob:
        'As a Cyber Security Analyst at SecureCyber Solutions, this individual is responsible for identifying and mitigating potential security risks, conducting vulnerability assessments, and developing robust security strategies.',
      description:
        'This comprehensive course provides in-depth knowledge and practical skills required to excel as a Cybersecurity Analyst. Topics include threat intelligence, incident response, network security, and ethical hacking.',
      info: 'Certified Cybersecurity expert, bringing extensive industry experience to deliver the Cybersecurity Analyst course effectively.',
      recommendations:
        'I had the privilege of learning from Jane during my Cyber Security course. His expertise, real-world examples, and engaging teaching style made the complex concepts easy to grasp. He is truly a knowledgeable and passionate instructor',
      recommendationsName: 'Noah Davis',
      dateRecommendation: '04/24/2023',
    },
    {
      id: 3,
      title: 'James Robinson',
      email: 'jamesrobinson@gmail.com',
      date: '13/07/1997',
      country: 'Australia',
      city: 'Sydney',
      phone: '+61 1234 567 890',
      education: 'CloudTech University',
      degree: 'Masters in Cloud Computing and Architecture',
      company: 'Data Insights Inc.',
      job: 'Cloud Solutions Architect',
      descriptionJob:
        'As a Cloud Solutions Architect at CloudWorks Inc., this individual is responsible for designing and implementing scalable, secure, and cost-effective cloud-based solutions for clients. They collaborate with cross-functional teams to ensure successful cloud deployments',
      description:
        'This comprehensive course equips students with the skills and knowledge to become proficient Cloud Solutions Architects. Topics covered include cloud infrastructure, deployment models, security, scalability, and cost optimization.',
      info: 'Master the art of Cloud Solutions Architecture and gain expertise in designing and deploying scalable, secure, and cost-effective cloud-based solutions to drive business growth and innovation.',
      recommendations:
        'James is an exceptional Cloud Solutions Architect with a deep understanding of cloud technologies and architecture. His ability to design innovative solutions and his dedication to client success make him an invaluable asset to any organization',
      recommendationsName: 'Alexander Wilson',
      dateRecommendation: '06/24/2023',
    },
    {
      id: 4,
      title: 'Noah Mitchell',
      email: 'noahmitchell@gmail.com',
      date: '25/07/1988',
      country: 'Ireland',
      city: 'Dublin',
      phone: '+353 12 345 6789',
      education: 'TechGenius University',
      degree: 'Bachelors in Software Engineering',
      company: 'InnovateTech Solutions',
      job: 'Software Engineer',
      descriptionJob:
        'As a Software Engineer at InnovateTech Solutions, this individual is responsible for developing high-quality software applications, collaborating with cross-functional teams, and implementing best coding practices to deliver innovative solutions.',
      description:
        'This rigorous course provides students with a strong foundation in software development principles, programming languages, algorithms, and software engineering best practices.',
      info: 'Develop strong skills in Software Engineering and learn to create innovative and robust software solutions, following best practices and utilizing the latest technologies.',
      recommendations:
        'I had the pleasure of working with Noah on a complex software project. His technical expertise, attention to detail, and ability to deliver high-quality code were exceptional. He is a skilled and dedicated Software Engineer.',
      recommendationsName: 'Ava Williams',
      dateRecommendation: '09/24/2023',
    },
  ];
  course: any;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const id = params.get('id');
      if (id) this.course = this.courses[+id - 1];
    });
  }
}
