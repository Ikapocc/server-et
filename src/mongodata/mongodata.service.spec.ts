import { Test, TestingModule } from '@nestjs/testing';
import { MongodataService } from './mongodata.service';

describe('MongodataService', () => {
  let service: MongodataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongodataService],
    }).compile();

    service = module.get<MongodataService>(MongodataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
