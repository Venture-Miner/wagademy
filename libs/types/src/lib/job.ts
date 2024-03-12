export const EmploymentClassificationEnum = {
  FULL_TIME: 'FULL_TIME',
  CONTRACT: 'CONTRACT',
  PART_TIME: 'PART_TIME',
  TEMPORARY: 'TEMPORARY',
  INTERNSHIP: 'INTERNSHIP',
  OTHER: 'OTHER',
} as const;

export type EmploymentClassificationEnum =
  (typeof EmploymentClassificationEnum)[keyof typeof EmploymentClassificationEnum];

export const AllocationEnum = {
  REMOTE: 'REMOTE',
  HYBRID: 'HYBRID',
  ON_SITE: 'ON_SITE',
} as const;

export type AllocationEnum =
  (typeof AllocationEnum)[keyof typeof AllocationEnum];

export const JobStatusEnum = {
  PUBLISHED: 'PUBLISHED',
  UNPUBLISHED: 'UNPUBLISHED',
} as const;

export type JobStatusEnum = (typeof JobStatusEnum)[keyof typeof JobStatusEnum];

export const JobApplicationStatusEnum = {
  SUBSCRIBED: 'SUBSCRIBED',
  INVITED: 'INVITED',
  INTERVIEWED: 'INTERVIEWED',
} as const;

export type JobApplicationStatusEnum =
  (typeof JobApplicationStatusEnum)[keyof typeof JobApplicationStatusEnum];

export type JobCompanyView = {
  id: string;
  title: string;
  description: string;
  employmentClassification: EmploymentClassificationEnum;
  allocation: AllocationEnum;
  aiInterviewQuestions: string[];
  views: number;
  _count: { jobApplications: number };
  jobStatus: JobStatusEnum;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateJobResponse = {
  id: string;
  title: string;
  description: string;
  employmentClassification: EmploymentClassificationEnum;
  allocation: AllocationEnum;
  aiInterviewQuestions: string[];
  views: number;
  _count: { jobApplications: number };
  jobStatus: JobStatusEnum;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateJobResponse = {
  id: string;
  title: string;
  description: string;
  employmentClassification: EmploymentClassificationEnum;
  allocation: AllocationEnum;
  aiInterviewQuestions: string[];
  views: number;
  _count: { jobApplications: number };
  jobStatus: JobStatusEnum;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateJob = {
  title: string;
  description: string;
  employmentClassification: EmploymentClassificationEnum;
  allocation: AllocationEnum;
};

export type JobUserView = {
  id: string;
  title: string;
  description: string;
  employmentClassification: EmploymentClassificationEnum;
  allocation: AllocationEnum;
  company: {
    companyProfile: {
      id: string;
      name: string;
      about: string;
      companyPhoto: { url: string } | null;
    } | null;
  };
  jobApplications: UserJobApplication[];
  jobStatus: JobStatusEnum;
  createdAt: Date;
  updatedAt: Date;
};

export type FindOneJobUserViewResponse = {
  id: string;
  title: string;
  description: string;
  employmentClassification: EmploymentClassificationEnum;
  allocation: AllocationEnum;
  company: {
    companyProfile: {
      id: string;
      name: string;
      about: string;
      companyPhoto: { url: string } | null;
    } | null;
  };
  jobApplications: UserJobApplication[];
  jobStatus: JobStatusEnum;
  createdAt: Date;
  updatedAt: Date;
};

export type JobApplicationCompanyView = {
  id: string;
  user: {
    userProfile: {
      id: string;
      name: string;
      profilePhoto: { url: string } | null;
      about: string;
    };
  };
  job: {
    id: string;
    title: string;
  };
  applicationStatus: JobApplicationStatusEnum;
  createdAt: Date;
  updatedAt: Date;
};

export type UserJobApplication = {
  id: string;
  job: {
    company: { name: string };
    title: string;
  };
  applicationStatus: JobApplicationStatusEnum;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateJobApplication = {
  jobId: string;
};

export type CreateJobApplicationResponse = {
  id: string;
  job: {
    company: { name: string };
    title: string;
  };
  applicationStatus: JobApplicationStatusEnum;
  createdAt: Date;
  updatedAt: Date;
};

export type FilterJobs = {
  search?: string;
  featured?: boolean;
  mostRecent?: boolean;
};

export type FilterCompanyJobs = {
  search?: string;
  numberOfApplications?: boolean;
  mostRecent?: boolean;
  jobViews?: boolean;
};

export type FindManyJobsUserView = { count: number; jobs: JobUserView[] };

export type FindManyJobsCompanyView = { count: number; jobs: JobCompanyView[] };
