import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'wagademy-jobs-details',
  templateUrl: './jobs-details.component.html',
  styleUrls: ['./jobs-details.component.css'],
})
export class JobsDetailsComponent implements OnInit {
  jobs = [
    {
      company: 'TechNova Solutions',
      description:
        'A cutting-edge technology company providing innovative solutions in software development, cloud computing, data analytics, and cybersecurity. Empowering businesses to thrive in the digital era.',
      about:
        'Utilize advanced analytics techniques to extract insights from vast datasets, develop machine learning models, and make data-driven decisions to solve complex business problems and optimize processes.',
      posts: [
        'Exciting news! Our team is thrilled to announce the launch of our latest cutting-edge technology solution. Stay tuned for more details!',
        'Join us in celebrating the achievements of our talented developers who recently won awards for their outstanding contributions to the tech industry.',
        "We're hiring! Looking for passionate and skilled professionals to join our dynamic team. Check out our career opportunities and take the next step in your tech career.",
        'Did you know that cloud computing can revolutionize your business operations? Discover the benefits of adopting cloud solutions and how it can drive efficiency and scalability.',
      ],
    },
    {
      company: 'TechVision Solutions',
      description:
        'A leading technology consulting firm, specializing in digital transformation, cloud solutions, and data analytics, helping businesses drive innovation and achieve their technology goals.',
      about:
        'Protect systems, networks, and data from security threats by monitoring, detecting, and responding to incidents, conducting vulnerability assessments, and implementing security controls to ensure the integrity and confidentiality of information.',
      posts: [
        "Cybersecurity is crucial in today's digital landscape. Learn about the latest trends and best practices to protect your business from cyber threats.",
        "We're excited to announce our upcoming webinar on AI and machine learning. Join us as we dive into the latest advancements and practical applications of these technologies.",
        'Our team had a great time attending the tech conference last week. We gained valuable insights, networked with industry leaders, and explored emerging technologies.',
        "Congratulations to our clients who successfully implemented our software solution, resulting in improved productivity and cost savings. We're proud to be part of their digital transformation journey.",
      ],
    },
    {
      company: 'CodeTech Innovations',
      description:
        'A software development company known for its expertise in building scalable and customized solutions, leveraging cutting-edge technologies to empower businesses with digital transformation.',
      about:
        'Design and implement scalable and secure cloud-based solutions, leveraging infrastructure and platform services, to meet business requirements. Ensure reliability, performance, and cost-efficiency while leveraging the benefits of cloud computing technologies.',
      posts: [
        "We're honored to be recognized as a top tech company in the region. This achievement reflects our commitment to innovation, customer satisfaction, and driving technological advancements.",
        'Stay ahead of the technology curve! Check out our latest blog post on the emerging trends in artificial intelligence and how they are shaping industries.',
        'We had an incredible time participating in the hackathon last weekend. Our team showcased their coding skills and creativity, resulting in innovative solutions to real-world challenges.',
        'Thrilled to announce our partnership with a leading tech giant. Together, we aim to deliver groundbreaking solutions and drive digital transformation in various industries.',
      ],
    },
    {
      company: 'DataSecure Systems',
      description:
        'A cybersecurity company providing comprehensive solutions to safeguard critical data and protect against cyber threats, offering advanced threat detection, incident response, and vulnerability management services.',
      about:
        'Develop high-quality software solutions by analyzing requirements, designing, coding, testing, and maintaining software applications. Collaborate with cross-functional teams, follow software engineering best practices, and stay updated with emerging technologies to deliver innovative and robust software products.',
      posts: [
        'Calling all tech enthusiasts! Join us for our upcoming Tech Talk series, where industry experts will share their insights and experiences on the latest tech trends.',
        'We believe in giving back to the community. Our team recently volunteered at a local coding workshop, inspiring the next generation of tech talent.',
        'Data is the new oil. Learn how our data analytics solutions can help businesses gain valuable insights, make informed decisions, and drive growth.',
        'Happy to share our latest client success story. Find out how our customized software solution helped streamline their operations and achieve significant cost savings.',
      ],
    },
  ];

  job: any;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const id = params.get('id');
      if (id) this.job = this.jobs[+id - 1];
    });
  }
}
