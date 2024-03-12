import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import {
  CreateJob,
  CreateJobApplication,
  CreateJobApplicationResponse,
  CreateJobResponse,
  FilterCompanyJobs,
  FilterJobs,
  FindManyJobsCompanyView,
  FindManyJobsUserView,
  FindOneJobUserViewResponse,
  JobApplicationStatusEnum,
  JobUserView,
  Pagination,
  UpdateJobResponse,
} from '@wagademy/types';
import { PrismaService } from '@wagademy/prisma';
import { Prisma } from '@prisma/client';
import { JobUserViewSelect } from '../../shared/select/job-user-view';
import { faker } from '@faker-js/faker';

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
      throw new UnauthorizedException(
        'You can not create a job before completing your profile.'
      );
    return this.prismaService.job.create({
      data: { ...createJob, company: { connect: { id: companyId } } },
      include: { _count: { select: { jobApplications: true } } },
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
      throw new UnauthorizedException(
        'Only users with complete profile can apply to a job.'
      );
    const job = await this.prismaService.job.findUnique({
      where: { id: jobId },
    });
    if (!job) {
      throw new NotFoundException('Job with the provided ID does not exist');
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
    userId?: string
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

  findOneJobUserView(
    id: string,
    userId: string
  ): Promise<FindOneJobUserViewResponse | null> {
    return this.prismaService.job.findUnique({
      where: { id },
      select: JobUserViewSelect(userId),
    });
  }

  async findManyJobsCompanyView(
    { jobViews, mostRecent, numberOfApplications, search }: FilterCompanyJobs,
    { skip, take }: Pagination,
    userId?: string
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
        include: { _count: { select: { jobApplications: true } } },
      }),
    ]);
    return { count, jobs };
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
    updateJobDto: UpdateJobDto,
    userId: string
  ): Promise<UpdateJobResponse> {
    const job = await this.prismaService.job.findUnique({
      where: { id },
    });
    if (!job) {
      throw new NotFoundException('Job with the provided ID does not exist');
    } else if (userId !== job.companyId)
      throw new UnauthorizedException(
        'You are not able to update this job since you do not own it'
      );
    return this.prismaService.job.update({
      where: { id },
      data: updateJobDto,
      include: { _count: { select: { jobApplications: true } } },
    });
  }

  remove(id: string) {
    return `This action removes a #${id} job`;
  }
}
