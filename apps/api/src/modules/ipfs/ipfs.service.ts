import { Injectable } from '@nestjs/common';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

@Injectable()
export class IpfsService {
  client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.API_KEY}:${process.env.API_SECRET}`,
        'utf-8'
      ).toString('base64')}`,
    },
  });

  async uploadIpfs(data: any) {
    const result = await this.client.add(JSON.stringify(data));
    return result;
  }
}
