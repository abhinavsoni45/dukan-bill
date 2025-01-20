import { Test, TestingModule } from '@nestjs/testing';
import { BillsResolver } from './bills.resolver';
import { BillsService } from './bills.service';

describe('BillsResolver', () => {
  let resolver: BillsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillsResolver, BillsService],
    }).compile();

    resolver = module.get<BillsResolver>(BillsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
