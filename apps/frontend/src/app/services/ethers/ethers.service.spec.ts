import { TestBed } from '@angular/core/testing';
import { EthersService } from './ethers.service';

jest.mock('ethers');

describe('EthersService', () => {
  let service: EthersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EthersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
