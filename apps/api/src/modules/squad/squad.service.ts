import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma-service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SquadService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.SquadCreateInput) {
    await this.prismaService.squad
      .create({ data })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (error.meta.target === 'Squad_name_key')
          throw new BadRequestException(
            { ...error },
            'Squad name already exists'
          );
        else throw new BadRequestException({ ...error });
      });
  }

  findAll() {
    return this.prismaService.squad.findMany();
  }

  findOne(id: string) {
    return this.prismaService.squad.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.SquadUpdateInput) {
    return this.prismaService.squad.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prismaService.squad.delete({ where: { id } });
  }
}
