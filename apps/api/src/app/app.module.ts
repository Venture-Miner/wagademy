import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from '@prisma-service';
import { SquadModule } from '@@/modules';

@Module({
  imports: [SquadModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
