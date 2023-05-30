import { TestBed } from '@angular/core/testing';
import { IpfsService } from './ipfs.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { v4 as uuidv4 } from 'uuid';

jest.mock('ethers');

const ipfsBody = {
  version: '2.0.0',
  mainContentFocus: 'TEXT_ONLY',
  description: 'Academy Curriculum',
  metadata_id: uuidv4(),
  locale: 'en-US',
  content: JSON.stringify({ curriculum: 'curriculum' }),
  name: `@any_handle Curriculum`,
  attributes: [],
  tags: [],
  appId: 'Academy',
};

describe('IpfsService', () => {
  let service: IpfsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(IpfsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save a post in ipfs', (done) => {
    service.createPost(ipfsBody).subscribe((response) => {
      expect(response).toEqual(ipfsBody);
      done();
    });

    const request = httpMock.expectOne(`${service.URL}/ipfs/create-post`);

    expect(request.request.method).toBe('POST');

    request.flush(ipfsBody);
  });
});
