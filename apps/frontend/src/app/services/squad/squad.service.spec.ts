import { TestBed } from '@angular/core/testing';
import { SquadService } from './squad.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

jest.mock('ethers');

describe('SquadService', () => {
  let service: SquadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SquadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
