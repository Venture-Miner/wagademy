import { TestBed } from '@angular/core/testing';
import { LensService } from './lens.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

jest.mock('ethers');

describe('LensService', () => {
  let service: LensService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
