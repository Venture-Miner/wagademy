import { TestBed } from '@angular/core/testing';

import { LensService } from './lens.service';
import { EthersService } from '../ethers';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

describe('LensService', () => {
  let service: LensService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: EthersService,
          useValue: { ethersProvider: { getSigner: jest.fn() } },
        },
      ],
    });
    service = TestBed.inject(LensService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
