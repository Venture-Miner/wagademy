import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import {
  CreateJobApplication,
  CreateJobApplicationResponse,
  FilterJobs,
  FindManyJobsUserView,
  JobApplicationStatusEnum,
  JobUserView,
  Pagination,
} from '@wagademy/types';
import { PrismaService } from '@wagademy/prisma';
import { Prisma } from '@prisma/client';
import { JobUserViewSelect } from '../../shared/select/job-user-view';

@Injectable()
export class JobService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createJobDto: CreateJobDto) {
    return 'This action adds a new job';
  }

  async createJobApplication(
    { jobId }: CreateJobApplication,
    userId: string
  ): Promise<CreateJobApplicationResponse> {
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

  findOneJobUserView(id: string, userId: string): Promise<JobUserView | null> {
    return this.prismaService.job.findUnique({
      where: { id },
      select: JobUserViewSelect(userId),
    });
  }

  findAll() {
    return `This action returns all job`;
  }

  update(id: string, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: string) {
    return `This action removes a #${id} job`;
  }
}
