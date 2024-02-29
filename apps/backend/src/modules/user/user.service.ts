import { Injectable } from '@nestjs/common';
import { PrismaService } from '@wagademy/prisma';
import {
  CreateUserResponse,
  UpdateUserResponse,
  FindOneUserResponse,
  UpdateUser,
  CreateUser,
} from '@wagademy/types';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUser: CreateUser): Promise<CreateUserResponse> {
    return this.prismaService.user.create({
      data: createUser,
    });
  }

  async update(
    updateUser: UpdateUser,
    userId: string
  ): Promise<UpdateUserResponse> {
    return this.prismaService.user.update({
      where: { id: userId },
      data: updateUser,
    });
  }

  async findOne(id: string): Promise<FindOneUserResponse | null> {
    return this.prismaService.user.findUnique({ where: { id } });
  }
}
