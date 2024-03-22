import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FileModule } from '../../infra';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [FileModule],
})
export class UserModule {}
