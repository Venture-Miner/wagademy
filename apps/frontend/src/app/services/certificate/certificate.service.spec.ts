import { TestBed } from '@angular/core/testing';
import { CertificateService } from './certificate.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

jest.mock('ethers');

describe('CertificateService', () => {
  let service: CertificateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CertificateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
