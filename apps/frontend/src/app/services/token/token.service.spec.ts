import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';
import { LensService } from '../lens';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: LensService, useValue: { ethersService: {} } }],
    });
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
