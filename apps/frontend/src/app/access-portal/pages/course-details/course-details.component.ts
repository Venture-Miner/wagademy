import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'wagademy-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent implements OnInit {
  showAddEmailModal = false;
  courses = [
    {
      id: 1,
      title: 'Data Scientist',
      description:
        'Learn data manipulation, visualization, and predictive modeling techniques to extract insights and make data-driven decisions across industries',
      duration: '30h',
      info: 'Experienced professor in Data Analytics & ML, providing a clear and practical approach to teaching.',
      comments: [
        {
          title: 'Christopher Anderson',
          comment:
            'The Data Analytics & ML course was an exceptional learning experience. The instructor"s expertise and hands-on approach allowed me to grasp complex concepts in data manipulation, visualization, and machine learning. I gained practical skills that have been invaluable in many data-driven decision-making processes.',
        },
        {
          title: 'Sophia Roberts',
          comment:
            'I highly recommend the Data Analytics & ML course. The instructor was very knowledgeable and I am pleased with the results. The course is also a great opportunity to learn more about data science and machine learning.',
        },
      ],
    },
    {
      id: 2,
      title: 'Cybersecurity Analyst',
      description:
        'Become a Cybersecurity Analyst and safeguard systems against cyber threats with skills in threat detection, incident response, and security control implementation.',
      duration: '30h',
      info: 'Certified Cybersecurity expert, bringing extensive industry experience to deliver the Cybersecurity Analyst course effectively.',
      comments: [
        {
          title: 'Catherine Hill',
          comment:
            'The Cybersecurity Analyst course provided a comprehensive understanding of threat detection, incident response, and security controls. The hands-on exercises and real-world examples were invaluable in preparing for real-world cybersecurity challenges.',
        },
        {
          title: 'James Mackenzie',
          comment:
            "I highly recommend the Cybersecurity Analyst course. The instructor's expertise and in-depth knowledge of the subject matter created an engaging learning environment. The practical skills and industry insights gained have been instrumental in advancing my career in cybersecurity.",
        },
      ],
    },
    {
      id: 3,
      title: 'Cloud Solutions Architect',
      description:
        'Master the art of Cloud Solutions Architecture and gain expertise in designing and deploying scalable, secure, and cost-effective cloud-based solutions to drive business growth and innovation.',
      duration: '30h',
      info: 'Experienced Cloud Solutions Architect with a track record of successful cloud implementations, bringing practical expertise to the course.',
      comments: [
        {
          title: 'Daiana Mcneal',
          comment:
            "The Cloud Solutions Architect course provided a comprehensive understanding of designing and implementing cloud-based solutions. The instructor's real-world experience and practical examples made the course engaging and highly valuable for my career in cloud architecture.",
        },
        {
          title: 'John Harriton',
          comment:
            "I highly recommend the Cloud Solutions Architect course. The instructor's deep knowledge of cloud technologies and hands-on approach helped me gain the skills needed to design scalable and secure solutions in cloud environments. The course provided valuable insights and practical experience.",
        },
      ],
    },
    {
      id: 4,
      title: 'Software Engineer',
      description:
        'Develop strong skills in Software Engineering and learn to create innovative and robust software solutions, following best practices and utilizing the latest technologies.',
      duration: '30h',
      info: 'Experienced Software Engineer with a proven track record, bringing practical industry knowledge to the Software Engineer course.',
      comments: [
        {
          title: 'Thomas Smith',
          comment:
            "The Software Engineer course was an excellent learning experience. The instructor's deep knowledge and practical approach to software development helped me gain valuable skills and confidence in building high-quality software solutions.",
        },
        {
          title: 'Matthew Davis',
          comment:
            "I highly recommend the Software Engineer course. The instructor's expertise and hands-on teaching style allowed me to grasp complex concepts and apply them in real-world projects. The course provided a solid foundation for my career as a software engineer.",
        },
      ],
    },
    {
      id: 4,
      title: 'Software Engineer',
      description:
        'Develop strong skills in Software Engineering and learn to create innovative and robust software solutions, following best practices and utilizing the latest technologies.',
      duration: '30h',
      info: 'Experienced Software Engineer with a proven track record, bringing practical industry knowledge to the Software Engineer course.',
      comments: [
        {
          title: 'Thomas Smith',
          comment:
            "The Software Engineer course was an excellent learning experience. The instructor's deep knowledge and practical approach to software development helped me gain valuable skills and confidence in building high-quality software solutions.",
        },
        {
          title: 'Matthew Davis',
          comment:
            "I highly recommend the Software Engineer course. The instructor's expertise and hands-on teaching style allowed me to grasp complex concepts and apply them in real-world projects. The course provided a solid foundation for my career as a software engineer.",
        },
      ],
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
