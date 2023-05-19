import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from '@prisma-service';
import { SquadModule } from '../modules';
import { IpfsModule } from '../modules/ipfs/ipfs.module';

@Module({
  imports: [SquadModule, IpfsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
