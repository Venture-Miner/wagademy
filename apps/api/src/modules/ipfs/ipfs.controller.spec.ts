import { Test, TestingModule } from '@nestjs/testing';
import { IpfsController } from './ipfs.controller';
import { IpfsService } from './ipfs.service';
import { AuthGuard } from '../../infra';
import { GraphQLService } from '../graphql';
import { JwtService } from '@nestjs/jwt';

describe('IpfsController', () => {
  let controller: IpfsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IpfsController],
      providers: [IpfsService, AuthGuard, GraphQLService, JwtService],
    }).compile();
    controller = module.get<IpfsController>(IpfsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
