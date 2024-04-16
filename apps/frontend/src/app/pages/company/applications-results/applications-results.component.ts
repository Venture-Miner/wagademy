import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';
import { JobService } from '../../../services/job/job.service';
import {
  AllocationEnum,
  EmploymentClassificationEnum,
  GetJobInterviewResultResponse,
  OpenAIChatModel,
} from '@wagademy/types';
import { formatEnumKeys } from '../../../shared/utils/functions/format-enum';

@Component({
  selector: 'wagademy-applications-profile',
  standalone: true,
  imports: [RouterModule, BackButtonComponent],
  templateUrl: './applications-results.component.html',
  styleUrl: './applications-results.component.scss',
})
export class ApplicationsResultsComponent implements OnInit {
  interviewResult: GetJobInterviewResultResponse = {
    id: '',
    history: undefined,
    jobApplication: {
      user: {
        userProfile: null,
      },
      job: {
        id: '',
        title: '',
        description: '',
        employmentClassification: 'FULL_TIME',
        allocation: 'REMOTE',
        aiInterviewQuestions: [],
        views: 0,
        _count: {
          jobApplications: 0,
        },
        company: {
          companyProfile: null,
        },
        jobStatus: 'PUBLISHED',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
  };
  chatHistory: OpenAIChatModel[] = [];
  image = './assets/img/images/img-default-profile.svg';
  fallbackImage = './assets/img/images/img-default-profile.svg';
  name = 'Marvin Wilson';
  email = 'randall.cooper@email.com';
  phone = '+55 11 912345-6789';
  job = 'Software Developer';
  description =
    'Responsible for creating, maintaining and updating software systems, according to the needs and requirements of customers and the company. We are looking for a highly motivated and experienced systems developer to join our technology team. The ideal candidate will be responsible for designing, developing, testing and implementing efficient and scalable software systems. The selected candidate will work closely with other developers, as well as project management and quality teams, to ensure systems meet customer and business requirements. The candidate must have experience in software development and be able to work on complex and large-scale projects using the most modern technologies and development tools.';
  modality = 'Full time';
  schedule = 'Remote work';
  questions = [
    {
      asking: '01 - Question example',
      answer:
        'Clara walked through the narrow streets of the small town, her steps echoing softly on the cobblestone pavement worn by time.',
    },
    {
      asking: '02 - Question example',
      answer:
        'Clara walked through the narrow streets of the small town, her steps echoing softly on the cobblestone pavement worn by time.',
    },
    {
      asking: '03 - Question example',
      answer:
        'Clara walked through the narrow streets of the small town, her steps echoing softly on the cobblestone pavement worn by time.',
    },
    {
      asking: '04 - Question example',
      answer:
        'Clara walked through the narrow streets of the small town, her steps echoing softly on the cobblestone pavement worn by time.',
    },
    {
      asking: '05 - Question example',
      answer:
        'Clara walked through the narrow streets of the small town, her steps echoing softly on the cobblestone pavement worn by time.',
    },
    {
      asking: '06 - Question example',
      answer:
        'Clara walked through the narrow streets of the small town, her steps echoing softly on the cobblestone pavement worn by time.',
    },
  ];
  userProfileId = '';
  jobApplicationId = '';
  employmentClassification = '';
  allocation = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly jobService: JobService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const jobApplicationId = params.get('jobApplicationId');
      if (jobApplicationId) this.jobApplicationId = jobApplicationId;
    });
    this.getApplicationResult();
  }

  getApplicationResult() {
    this.jobService.getJobInterviewResult(this.jobApplicationId).subscribe({
      next: (interviewResult) => {
        if (interviewResult) {
          this.userProfileId =
            interviewResult.jobApplication.user.userProfile?.id ?? '';
          this.interviewResult = interviewResult;
          this.chatHistory = interviewResult.history;
          this.employmentClassification =
            formatEnumKeys<EmploymentClassificationEnum>(
              interviewResult.jobApplication.job
                ?.employmentClassification as EmploymentClassificationEnum
            ) as string;
          this.allocation = formatEnumKeys<AllocationEnum>(
            interviewResult.jobApplication.job?.allocation as AllocationEnum
          ) as string;
        }
      },
    });
  }
}
