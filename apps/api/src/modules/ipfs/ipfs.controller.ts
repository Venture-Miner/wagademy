import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
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
}
