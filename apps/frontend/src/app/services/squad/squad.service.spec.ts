import { TestBed } from '@angular/core/testing';
import { SquadService } from './squad.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Squad } from '../../interfaces';

jest.mock('ethers');

const squad: Squad = {
  id: 'any_id',
  name: 'any_name',
  members: ['any_member'],
  owner: 'any_owner',
};

describe('SquadService', () => {
  let service: SquadService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SquadService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get squads', (done) => {
    service.getSquads().subscribe((response) => {
      expect(response).toEqual([squad]);
      done();
    });

    const request = httpMock.expectOne(`${service.URL}/squad`);

    expect(request.request.method).toBe('GET');

    request.flush([squad]);
  });

  it('should get squad', (done) => {
    const id = squad.id;
    service.getSquad(id).subscribe((response) => {
      expect(response).toEqual(squad);
      done();
    });

    const request = httpMock.expectOne(`${service.URL}/squad/${id}`);

    expect(request.request.method).toBe('GET');

    request.flush(squad);
  });

  it('should create a squad', (done) => {
    service.createSquad({ name: 'any_name' }).subscribe((response) => {
      expect(response).toEqual(squad);
      done();
    });

    const request = httpMock.expectOne(`${service.URL}/squad`);

    expect(request.request.method).toBe('POST');

    request.flush(squad);
  });

  it('should join a squad', (done) => {
    const id = squad.id;
    service.joinSquad(id).subscribe((response) => {
      expect(response).toEqual(squad);
      done();
    });

    const request = httpMock.expectOne(`${service.URL}/squad/join/${id}`);

    expect(request.request.method).toBe('PATCH');

    request.flush(squad);
  });

  it('should quit from a squad', (done) => {
    const id = squad.id;
    service.quitSquad(id).subscribe((response) => {
      expect(response).toEqual(squad);
      done();
    });

    const request = httpMock.expectOne(`${service.URL}/squad/quit/${id}`);

    expect(request.request.method).toBe('PATCH');

    request.flush(squad);
  });
});
