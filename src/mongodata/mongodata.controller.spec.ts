import { Test, TestingModule } from '@nestjs/testing';
import { MongodataController } from './mongodata.controller';
import { MongodataService } from './mongodata.service';

describe('MongodataController', () => {
  let controller: MongodataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MongodataController],
      providers: [MongodataService],
    }).compile();

    controller = module.get<MongodataController>(MongodataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
