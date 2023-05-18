import { Module } from '@nestjs/common';
import { SquadService } from './squad.service';
import { SquadController } from './squad.controller';
import { PrismaService } from '@prisma-service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@@/infra';
import { GraphQLService } from '../graphql/graphql.service';

@Module({
  controllers: [SquadController],
  providers: [
    JwtService,
    SquadService,
    PrismaService,
    AuthGuard,
    GraphQLService,
  ],
})
export class SquadModule {}
