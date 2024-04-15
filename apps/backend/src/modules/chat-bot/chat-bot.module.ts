import { Module } from '@nestjs/common';
import { ChatBotService } from './chat-bot.service';
import { ChatBotController } from './chat-bot.controller';
import { FileService } from '../../infra';

@Module({
  controllers: [ChatBotController],
  providers: [ChatBotService, FileService],
})
export class ChatBotModule {}
