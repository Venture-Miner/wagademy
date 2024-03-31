import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';

@Injectable()
export class ProducerService {
  private channelWrapper: ChannelWrapper;

  constructor() {
    const connection = amqp.connect([process.env.BROKER_URL]);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue('fineTuningStatusQueue', { durable: true });
      },
    });
  }

  async addToFineTuningStatusQueue(id: string) {
    try {
      await this.channelWrapper.sendToQueue(
        'fineTuningStatusQueue',
        Buffer.from(JSON.stringify(id))
      );
      Logger.log('Sent To Queue');
    } catch (error) {
      throw new HttpException(
        'Error adding to fine tuning status queue',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
