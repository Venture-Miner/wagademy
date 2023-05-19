import { TestBed } from '@angular/core/testing';
import { SquadService } from './squad.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TokenService } from '../token';

describe('SquadService', () => {
  let service: SquadService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: TokenService,
          useValue: {
            lensService: { ethersService: {} },
          },
        },
      ],
    });

    service = TestBed.inject(SquadService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
