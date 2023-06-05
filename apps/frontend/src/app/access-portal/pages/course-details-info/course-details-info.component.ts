import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'wagademy-course-details-info',
  templateUrl: './course-details-info.component.html',
  styleUrls: ['./course-details-info.component.css'],
})
export class CourseDetailsInfoComponent {
  coursesInfo = [];
  courses = [
    {
      id: 1,
      title: 'Ethan Wilson',
      email: 'ethanwilson@gmail.com',
      date: '14/12/1995',
      country: 'United Kingdom',
      city: 'Londres',
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
        'ohn is an exceptional Data Analytics & ML instructor. His deep knowledge and ability to explain complex concepts in a clear and engaging manner make him a valuable asset to any learning environment.',
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
      city: 'Londres',
      phone: '+61 1234 567 890',
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
        'ohn is an exceptional Data Analytics & ML instructor. His deep knowledge and ability to explain complex concepts in a clear and engaging manner make him a valuable asset to any learning environment.',
      recommendationsName: 'Emma Johnson',
      dateRecommendation: '04/24/2023',
    },
    {
      id: 4,
      title: 'Ethan Wilson',
      email: 'ethanwilson@gmail.com',
      date: '14/12/1995',
      country: 'United Kingdom',
      city: 'Londres',
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
        'ohn is an exceptional Data Analytics & ML instructor. His deep knowledge and ability to explain complex concepts in a clear and engaging manner make him a valuable asset to any learning environment.',
      recommendationsName: 'Emma Johnson',
      dateRecommendation: '04/24/2023',
    },
    {
      id: 5,
      title: 'Ethan Wilson',
      email: 'ethanwilson@gmail.com',
      date: '14/12/1995',
      country: 'United Kingdom',
      city: 'Londres',
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
        'ohn is an exceptional Data Analytics & ML instructor. His deep knowledge and ability to explain complex concepts in a clear and engaging manner make him a valuable asset to any learning environment.',
      recommendationsName: 'Emma Johnson',
      dateRecommendation: '04/24/2023',
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
