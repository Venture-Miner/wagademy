import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { OpenAIModule } from '../openai/openai.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), OpenAIModule.registerAsync()],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
