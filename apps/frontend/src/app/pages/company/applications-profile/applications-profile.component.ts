import { Component, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';
import { UserService } from '../../../services/user/user.service';
import { ToastService } from '../../../services/toast/toast.service';
import { JobApplicationStatusEnum, UserProfile } from '@wagademy/types';
import { JobService } from '../../../services/job/job.service';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  selector: 'wagademy-applications-profile',
  standalone: true,
  imports: [
    RouterModule,
    ModalComponent,
    BackButtonComponent,
    DatePipe,
    LoadingComponent,
  ],
  templateUrl: './applications-profile.component.html',
  styleUrl: './applications-profile.component.scss',
})
export class ApplicationsProfileComponent implements OnInit {
  userProfileId = '';
  jobApplicationId = '';
  userProfile: UserProfile = {
    id: '',
    name: '',
    email: '',
    dateOfBirth: new Date(),
    contactNumber: '',
    country: '',
    state: '',
    about: '',
    userId: '',
    education: [],
    professionalExperience: [],
    areasOfExpertise: [],
    skillsAndCompetencies: [],
    profilePhoto: null,
  };
  profilePhoto = '';
  jobApplicationStatus: JobApplicationStatusEnum =
    JobApplicationStatusEnum.SUBSCRIBED;
  isLoading = false;

  constructor(
    private readonly userService: UserService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private readonly jobService: JobService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const userProfileId = params.get('userProfileId');
      if (userProfileId) this.userProfileId = userProfileId;
      const jobApplicationId = params.get('jobApplicationId');
      if (jobApplicationId) this.jobApplicationId = jobApplicationId;
    });
    this.getProfile();
    this.getJobApplication();
  }

  getProfile() {
    this.isLoading = true;
    this.userService.findUserProfile(this.userProfileId).subscribe({
      next: (userProfile) => {
        this.userProfile = userProfile as UserProfile;
        this.profilePhoto = this.userProfile.profilePhoto?.url ?? '';
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.toastService.showToast({
          message: 'Error while retrieving profile',
          type: 'error',
        });
      },
    });
  }

  getJobApplication() {
    this.isLoading = true;
    this.jobService
      .findOneJobApplicationCompanyView(this.jobApplicationId)
      .subscribe({
        next: (jobApplication) => {
          if (!jobApplication) {
            this.toastService.showToast({
              message: 'Job application does not exist',
              type: 'error',
            });
            this.location.back();
          } else this.jobApplicationStatus = jobApplication?.applicationStatus;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.toastService.showToast({
            message: 'Error while retrieving job application data',
            type: 'error',
          });
        },
      });
  }

  sendInvite() {
    this.isLoading = true;
    this.jobService.inviteToInterview(this.jobApplicationId).subscribe({
      next: () => {
        this.jobApplicationStatus = 'INVITED';
        this.toastService.showToast({
          message: 'User successfully invited',
          type: 'success',
        });
        this.isLoading = false;
        window.modal['close']();
      },
      error: () => {
        this.toastService.showToast({
          message: 'Error while inviting user',
          type: 'error',
        });
        this.isLoading = false;
      },
    });
  }
}
