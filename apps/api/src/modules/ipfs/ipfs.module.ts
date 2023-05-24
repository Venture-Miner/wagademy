import { Module } from '@nestjs/common';
import { IpfsService } from './ipfs.service';
import { IpfsController } from './ipfs.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma-service';
import { AuthGuard } from '../../infra';
import { GraphQLService } from '../graphql';

@Module({
  controllers: [IpfsController],
  providers: [
    IpfsService,
    JwtService,
    PrismaService,
    AuthGuard,
    GraphQLService,
  ],
})
export class IpfsModule {}
