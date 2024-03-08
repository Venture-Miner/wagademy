import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import {
  CreateJobApplication,
  JobApplicationStatusEnum,
} from '@wagademy/types';
import { PrismaService } from '@wagademy/prisma';

@Injectable()
export class JobService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createJobDto: CreateJobDto) {
    return 'This action adds a new job';
  }

  async createJobApplication({ jobId }: CreateJobApplication, userId: string) {
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
