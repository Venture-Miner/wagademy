import { Module } from '@nestjs/common';
import { ChatBotService } from './chat-bot.service';
import { ChatBotController } from './chat-bot.controller';
import { FileService } from '../../infra';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ChatBotController],
  providers: [ChatBotService, FileService, ConfigService],
})
export class ChatBotModule {}
