import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';
import { Upload } from '@aws-sdk/lib-storage';
import { S3 } from '@aws-sdk/client-s3';
import { mockClient } from 'aws-sdk-client-mock';
import { file, uploadFileResponse } from '../../../shared/mock/global.mock';

describe('FileService', () => {
  let service: FileService;
  const s3Mock = mockClient(S3);

  beforeAll(() => {
    process.env.AWS_DEFAULT_REGION = 'us-east-1';
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileService,
        {
          provide: Upload,
          useValue: jest.fn(),
        },
      ],
    }).compile();
    s3Mock.reset();
    service = module.get<FileService>(FileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(s3Mock).toBeDefined();
  });

  describe('uploadFile()', () => {
    it('should successfully upload a file and return its key and URL', async () => {
      const uploadedData = await service.uploadFile(file[0], 'private');
      expect(uploadedData.key).not.toBeUndefined();
      expect(uploadedData.url).not.toBeUndefined();
      expect(uploadedData.url).not.toBeNull();
      expect(uploadedData.key).not.toBeNull();
    });
  });

  describe('removeFile()', () => {
    it('should successfully remove a file from S3 and return a truthy response', async () => {
      const removedFileResponse = await service.removeFile(
        uploadFileResponse.key
      );
      expect(removedFileResponse).not.toBeUndefined();
    });
  });
});
