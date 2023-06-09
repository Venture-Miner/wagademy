import { Test, TestingModule } from '@nestjs/testing';
import { SquadService } from './squad.service';
import { PrismaService } from '@prisma-service';

describe('SquadService', () => {
  let service: SquadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SquadService, PrismaService],
    }).compile();
    service = module.get<SquadService>(SquadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
