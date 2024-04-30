import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateJob,
  CreateJobApplication,
  CreateJobApplicationResponse,
  CreateJobResponse,
  FilterCompanyJobs,
  FilterCompanyJobApplications,
  FilterJobs,
  FindManyJobApplicationsCompanyView,
  FindManyJobsCompanyView,
  FindManyJobsUserView,
  FindOneJobCompanyViewResponse,
  FindOneJobUserViewResponse,
  JobApplicationStatusEnum,
  JobUserView,
  Pagination,
  UpdateJob,
  UpdateJobResponse,
  UpdateJobApplicationCompanyView,
  ConfigureAIQuestions,
  FindManyJobApplicationsUserView,
  FilterUserJobApplications,
  GetJobInterviewResultResponse,
  FindOneJobApplicationCompanyView,
} from '@wagademy/types';
import { PrismaService } from '@wagademy/prisma';
import { Prisma } from '@prisma/client';
import { JobUserViewSelect } from '../../shared/select/job-user-view';
import { faker } from '@faker-js/faker';
import { getJobInterviewResultIncludes } from '../../shared/include';

@Injectable()
export class JobService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createJob: CreateJob,
    companyId: string
  ): Promise<CreateJobResponse> {
    const profile = await this.prismaService.companyProfile.findUnique({
      where: { userId: companyId },
    });
    if (!profile)
      throw new ForbiddenException(
        'You can not create a job before completing your profile.'
      );
    return this.prismaService.job.create({
      data: { ...createJob, company: { connect: { id: companyId } } },
      include: {
        _count: { select: { jobApplications: true } },
        company: {
          select: {
            companyProfile: {
              select: { companyPhoto: { select: { url: true } } },
            },
          },
        },
      },
    });
  }

  async createJobApplication(
    { jobId }: CreateJobApplication,
    userId: string
  ): Promise<CreateJobApplicationResponse> {
    const profile = await this.prismaService.userProfile.findUnique({
      where: { userId },
    });
    if (!profile)
      throw new ForbiddenException(
        'Only users with complete profile can apply to a job.'
      );
    const job = await this.prismaService.job.findUnique({
      where: { id: jobId },
    });
    if (!job) {
      throw new NotFoundException('Job with the provided ID does not exist.');
    }
    return this.prismaService.jobApplication.create({
      data: {
        applicationStatus: JobApplicationStatusEnum.SUBSCRIBED,
        job: { connect: { id: jobId } },
        user: { connect: { id: userId } },
      },
      include: {
        job: {
          select: {
            title: true,
            company: { select: { name: true } },
          },
        },
        user: false,
      },
    });
  }

  async findManyJobsUserView(
    { featured, mostRecent, search }: FilterJobs,
    { skip, take }: Pagination,
    userId: string
  ): Promise<FindManyJobsUserView> {
    const AND: Prisma.JobWhereInput[] = [];
    const orderBy: Prisma.JobOrderByWithRelationInput[] = [];
    if (search !== undefined)
      AND.push({ title: { contains: search, mode: 'insensitive' } });
    if (featured) {
      orderBy.push({ views: 'desc' }, { jobApplications: { _count: 'desc' } });
    }
    if (mostRecent) orderBy.push({ createdAt: 'desc' });
    const where = { AND };
    const [count, jobs] = await Promise.all([
      this.prismaService.job.count({ where }),
      this.prismaService.job.findMany({
        where,
        orderBy,
        skip,
        take,
        select: JobUserViewSelect(userId),
      }),
    ]);
    return { count, jobs };
  }

  async findManyJobsCompanyView(
    { jobViews, mostRecent, numberOfApplications, search }: FilterCompanyJobs,
    { skip, take }: Pagination,
    userId: string
  ): Promise<FindManyJobsCompanyView> {
    const AND: Prisma.JobWhereInput[] = [];
    AND.push({ companyId: userId });
    const orderBy: Prisma.JobOrderByWithRelationInput[] = [];
    if (search !== undefined)
      AND.push({ title: { contains: search, mode: 'insensitive' } });
    if (jobViews) {
      orderBy.push({ views: 'desc' });
    }
    if (numberOfApplications)
      orderBy.push({ jobApplications: { _count: 'desc' } });
    if (mostRecent) orderBy.push({ createdAt: 'desc' });
    const where = { AND };
    const [count, jobs] = await Promise.all([
      this.prismaService.job.count({ where }),
      this.prismaService.job.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          _count: { select: { jobApplications: true } },
          company: {
            select: {
              companyProfile: {
                select: { companyPhoto: { select: { url: true } } },
              },
            },
          },
        },
      }),
    ]);
    return { count, jobs };
  }

  async findManyJobApplicationsCompanyView(
    {
      interviewed,
      invited,
      mostRecent,
      search,
      jobId,
    }: FilterCompanyJobApplications,
    { skip, take }: Pagination,
    userId: string
  ): Promise<FindManyJobApplicationsCompanyView> {
    const AND: Prisma.JobApplicationWhereInput[] = [];
    AND.push({ job: { companyId: userId } });
    const orderBy: Prisma.JobOrderByWithRelationInput[] = [];
    if (search)
      AND.push({
        OR: [
          { job: { title: { contains: search, mode: 'insensitive' } } },
          {
            user: {
              userProfile: { name: { contains: search, mode: 'insensitive' } },
            },
          },
        ],
      });
    if (interviewed)
      AND.push({ applicationStatus: JobApplicationStatusEnum.INTERVIEWED });
    if (invited)
      AND.push({ applicationStatus: JobApplicationStatusEnum.INVITED });
    if (mostRecent) orderBy.push({ createdAt: 'desc' });
    if (jobId) AND.push({ jobId });
    const where = { AND };
    const [count, jobApplications] = await Promise.all([
      this.prismaService.jobApplication.count({ where }),
      this.prismaService.jobApplication.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          user: {
            include: {
              userProfile: {
                select: {
                  id: true,
                  name: true,
                  profilePhoto: { select: { url: true } },
                  about: true,
                },
              },
            },
          },
          job: { select: { id: true, title: true } },
          jobInterviewChat: { select: { id: true } },
        },
      }),
    ]);
    return { count, jobApplications };
  }

  async findManyJobApplicationsUserView(
    { invited }: FilterUserJobApplications,
    { skip, take }: Pagination,
    userId: string
  ): Promise<FindManyJobApplicationsUserView> {
    const AND: Prisma.JobApplicationWhereInput[] = [];
    AND.push({ userId });
    if (invited)
      AND.push({ applicationStatus: JobApplicationStatusEnum.INVITED });
    const where = { AND };

    const countWhere = !invited
      ? {
          AND: [
            { userId },
            { applicationStatus: JobApplicationStatusEnum.INVITED },
          ],
        }
      : { userId };

    const [count, countWithFilter, jobApplications] = await Promise.all([
      this.prismaService.jobApplication.count({ where }),
      this.prismaService.jobApplication.count({
        where: countWhere,
      }),
      this.prismaService.jobApplication.findMany({
        where,
        skip,
        take,
        include: {
          job: {
            select: {
              title: true,
              company: { select: { name: true } },
            },
          },
        },
      }),
    ]);
    return { count, countWithFilter, jobApplications };
  }

  findOneJobUserView(
    id: string,
    userId: string
  ): Promise<FindOneJobUserViewResponse | null> {
    return this.prismaService.job.findUnique({
      where: { id },
      select: JobUserViewSelect(userId),
    });
  }

  findOneJobApplicationCompanyView(
    id: string,
    companyId: string
  ): Promise<FindOneJobApplicationCompanyView | null> {
    return this.prismaService.jobApplication.findFirst({
      where: { id, job: { companyId } },
      include: {
        user: {
          include: {
            userProfile: {
              select: {
                id: true,
                name: true,
                profilePhoto: { select: { url: true } },
                about: true,
              },
            },
          },
        },
        job: { select: { id: true, title: true } },
        jobInterviewChat: { select: { id: true } },
      },
    });
  }

  findOneJobCompanyView(
    id: string,
    userId: string
  ): Promise<FindOneJobCompanyViewResponse | null> {
    return this.prismaService.job.findFirst({
      where: { id, companyId: userId },
      include: {
        _count: { select: { jobApplications: true } },
        company: {
          select: {
            companyProfile: {
              select: { companyPhoto: { select: { url: true } } },
            },
          },
        },
      },
    });
  }

  async getJobInterviewResult(
    id: string,
    companyId: string
  ): Promise<GetJobInterviewResultResponse | null> {
    const jobApplication = await this.prismaService.jobApplication.findUnique({
      where: { id },
      select: { jobInterviewChat: { select: { id: true } } },
    });
    if (!jobApplication)
      throw new NotFoundException('There is no application from provided ID');
    return this.prismaService.jobInterviewChat.findUnique({
      where: {
        id: jobApplication.jobInterviewChat[0].id,
        jobApplication: { job: { companyId } },
      },
      include: getJobInterviewResultIncludes,
    });
  }

  updateViews(id: string): Promise<JobUserView> {
    return this.prismaService.job.update({
      where: { id },
      data: { views: { increment: 1 } },
      select: JobUserViewSelect(faker.database.mongodbObjectId()),
    });
  }

  async update(
    id: string,
    updateJobDto: UpdateJob,
    userId: string
  ): Promise<UpdateJobResponse> {
    const job = await this.prismaService.job.findUnique({
      where: { id },
    });
    if (!job) {
      throw new NotFoundException('Job with the provided ID does not exist.');
    }
    if (userId !== job.companyId)
      throw new ForbiddenException(
        'You are not able to update this job since you do not own it.'
      );
    return this.prismaService.job.update({
      where: { id },
      data: updateJobDto,
      include: {
        _count: { select: { jobApplications: true } },
        company: {
          select: {
            companyProfile: {
              select: { companyPhoto: { select: { url: true } } },
            },
          },
        },
      },
    });
  }

  async inviteToInterview(
    id: string,
    userId: string
  ): Promise<UpdateJobApplicationCompanyView> {
    const jobApplication = await this.prismaService.jobApplication.findUnique({
      where: { id },
      include: { job: { select: { companyId: true } } },
    });
    if (!jobApplication) {
      throw new NotFoundException(
        'Job application with the provided ID does not exist.'
      );
    }
    if (jobApplication.job.companyId !== userId)
      throw new ForbiddenException(
        'You are not able to invite the user since you do not own this job position.'
      );
    if (jobApplication.applicationStatus !== 'SUBSCRIBED')
      throw new ForbiddenException(
        'You are not able to invite the user since the user is invited or already did the interview .'
      );
    return this.prismaService.jobApplication.update({
      where: { id },
      data: { applicationStatus: JobApplicationStatusEnum.INVITED },
      include: {
        user: {
          include: {
            userProfile: {
              select: {
                id: true,
                name: true,
                profilePhoto: { select: { url: true } },
                about: true,
              },
            },
          },
        },
        job: {
          select: {
            id: true,
            title: true,
          },
        },
        jobInterviewChat: { select: { id: true } },
      },
    });
  }

  async configureAIQuestions(
    id: string,
    userId: string,
    { aiInterviewQuestions }: ConfigureAIQuestions
  ): Promise<UpdateJobResponse> {
    const job = await this.prismaService.job.findUnique({ where: { id } });
    if (!job) {
      throw new NotFoundException('Job with the provided ID does not exist.');
    }
    if (userId !== job.companyId)
      throw new ForbiddenException(
        'You are not able to update this job since you do not own it.'
      );
    return this.prismaService.job.update({
      where: { id },
      data: { aiInterviewQuestions },
      include: {
        _count: { select: { jobApplications: true } },
        company: {
          select: {
            companyProfile: {
              select: { companyPhoto: { select: { url: true } } },
            },
          },
        },
      },
    });
  }

  remove(id: string) {
    return `This action removes a #${id} job`;
  }
}
