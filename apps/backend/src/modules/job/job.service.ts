import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { CreateJobApplication } from '@wagademy/types';
import { PrismaService } from '@wagademy/prisma';

@Injectable()
export class JobService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createJobDto: CreateJobDto) {
    return 'This action adds a new job';
  }

  async createJobApplication(
    createJobApplication: CreateJobApplication,
    userId: string
  ) {
    if (createJobApplication.applicationStatus === 'INVITED') {
      const job = await this.prismaService.job.findUnique({
        where: { id: createJobApplication.jobId },
        include: { company: { select: { id: true } } },
      });
      if (!job) {
        throw new NotFoundException('Job with the provided ID does not exist');
      }
      if (job?.company.id !== userId)
        throw new UnauthorizedException(
          'Only the company that posted the job can send invites'
        );
    } else if (userId !== createJobApplication.userId) {
      throw new UnauthorizedException(
        'Only the user who is applying can submit the application'
      );
    }
    return this.prismaService.jobApplication.create({
      data: {
        applicationStatus: createJobApplication.applicationStatus,
        job: { connect: { id: createJobApplication.jobId } },
        user: { connect: { id: createJobApplication.userId } },
      },
    });
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
