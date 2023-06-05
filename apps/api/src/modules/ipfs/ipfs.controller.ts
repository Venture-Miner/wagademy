import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IpfsService } from './ipfs.service';
import { AuthGuard } from '../../infra';

@Controller('ipfs')
export class IpfsController {
  constructor(private readonly ipfsService: IpfsService) {}

  @UseGuards(AuthGuard)
  @Post('create-post')
  async createPost(@Body() data: any) {
    return this.ipfsService.uploadIpfs(data);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload-image')
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/png' })],
      })
    )
    file: Express.Multer.File
  ) {
    return this.ipfsService.uploadIpfs(file.buffer);
  }
}
