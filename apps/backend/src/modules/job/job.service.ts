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
  Pagination,
} from '@wagademy/types';
import { PrismaService } from '@wagademy/prisma';
import { Prisma } from '@prisma/client';

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
        select: {
          id: true,
          title: true,
          description: true,
          jobType: true,
          allocation: true,
          company: {
            select: {
              companyProfile: {
                select: {
                  id: true,
                  name: true,
                  about: true,
                  companyPhoto: { select: { url: true } },
                },
              },
            },
          },
          jobApplications: {
            where: { userId },
            select: {
              id: true,
              job: {
                select: {
                  company: { select: { name: true } },
                  title: true,
                },
              },
              applicationStatus: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          jobStatus: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
    ]);
    return { count, jobs };
  }

  findAll() {
    return `This action returns all job`;
  }

  findOne(id: string) {
    return `This action returns a #${id} job`;
  }

  update(id: string, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: string) {
    return `This action removes a #${id} job`;
  }
}
