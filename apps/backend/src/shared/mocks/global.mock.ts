import { Readable } from 'stream';
import { UploadFileOutput } from '@wagademy/types';

export const file: Express.Multer.File[] = [
  {
    originalname: 'example.png',
    mimetype: 'text/csv',
    path: 'example',
    buffer: Buffer.from('example'),
    fieldname: '',
    encoding: '',
    size: 0,
    stream: new Readable(),
    destination: '',
    filename: '',
  },
];

export const uploadFileResponse: UploadFileOutput = {
  url: 'https://example.s3.us-west-2.amazonaws.com',
  key: 'ca7a6ad2-505e-49d1-9838-a3fbb133c497-example.png',
};

export const mockFileData = {
  data: {
    key: 'ca7a6ad2-505e-49d1-9838-a3fbb133c497-example.png',
    url: 'https://example.s3.us-west-2.amazonaws.com',
  },
};
