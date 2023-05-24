import { TestBed } from '@angular/core/testing';
import { IpfsService } from './ipfs.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

jest.mock('ethers');

describe('IpfsService', () => {
  let service: IpfsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(IpfsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
