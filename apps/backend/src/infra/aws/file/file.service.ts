import { Injectable } from '@nestjs/common';
import { Upload } from '@aws-sdk/lib-storage';
import {
  CompleteMultipartUploadCommandOutput,
  ObjectCannedACL,
  S3,
} from '@aws-sdk/client-s3';
import * as crypto from 'crypto';
import { UploadFileOutput } from '@wagademy/types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileService {
  constructor(private readonly configService: ConfigService) {}
  s3 = new S3({
    region: this.configService.get('AWS_DEFAULT_REGION') as string,
    credentials: {
      secretAccessKey: this.configService.get(
        'AWS_SECRET_ACCESS_KEY'
      ) as string,
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID') as string,
    },
  });

  async uploadFile(
    { buffer, originalname, mimetype }: Express.Multer.File,
    acl: ObjectCannedACL
  ): Promise<UploadFileOutput> {
    const uploadResult: CompleteMultipartUploadCommandOutput = await new Upload(
      {
        client: this.s3,
        params: {
          ACL: acl,
          Bucket: this.configService.get('AWS_BUCKET'),
          Body: buffer,
          Key: `${crypto.randomUUID()}-${originalname}`,
          ContentType: mimetype,
        },
      }
    ).done();
    const data = {
      url: uploadResult.Location as string,
      key: uploadResult.Key as string,
    };
    return data;
  }

  async removeFile(key: string): Promise<S3> {
    await this.s3.deleteObject({
      Bucket: this.configService.get('AWS_BUCKET'),
      Key: key,
    });
    return this.s3;
  }
}
