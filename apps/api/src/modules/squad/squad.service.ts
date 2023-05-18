import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma-service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SquadService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.SquadCreateInput) {
    return this.prismaService.squad.create({ data });
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
