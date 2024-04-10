import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { JobCompanyView, Pagination } from '@wagademy/types';
import { JobService } from '../../../services/job/job.service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'wagademy-home-company',
  standalone: true,
  imports: [InputComponent, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeCompanyComponent implements OnInit {
  jobs: JobCompanyView[] = [];
  courses = [
    {
      images: './assets/img/images/img-example-course.webp',
      name: 'Courses name',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
    },
    {
      images: './assets/img/images/img-example-course.webp',
      name: 'Courses name',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
    },
    {
      images: './assets/img/images/img-example-course.webp',
      name: 'Courses name',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
    },
    {
      images: './assets/img/images/img-example-course.webp',
      name: 'Courses name',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
    },
  ];
  isLoading = false;
  selectedCardIndex: number | null = null;
  selectedCardCourseIndex: number | null = null;
  skip = 0;
  take = 4;

  constructor(
    private readonly jobService: JobService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.findManyJobsCompanyView();
  }

  onCardCourseClick(index: number) {
    if (this.selectedCardCourseIndex === index) {
      this.selectedCardCourseIndex = null;
    } else {
      this.selectedCardCourseIndex = index;
    }
  }

  onCardClick(index: number) {
    if (this.selectedCardIndex === index) {
      this.selectedCardIndex = null;
    } else {
      this.selectedCardIndex = index;
    }
  }

  findManyJobsCompanyView() {
    const pagination: Pagination = { take: this.take, skip: this.skip };
    this.isLoading = true;
    this.jobService
      .findManyJobsCompanyView({ mostRecent: true }, pagination)
      .subscribe({
        next: ({ jobs }) => {
          this.jobs = jobs;
          this.isLoading = false;
        },
        error: ({ error }) => {
          this.isLoading = false;
          const message =
            error.statusCode !== 500
              ? error.message
              : 'Error while retrieving job applications';
          this.toastService.showToast({
            message,
            type: 'error',
          });
        },
      });
  }
}
