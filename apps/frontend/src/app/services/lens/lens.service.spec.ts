import { TestBed } from '@angular/core/testing';
import { LensService } from './lens.service';

jest.mock('ethers');

describe('LensService', () => {
  let service: LensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
