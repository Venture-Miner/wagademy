import { Module, Global, DynamicModule, Provider } from '@nestjs/common';
import { OpenAI } from 'openai';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({})
export class OpenAIModule {
  static registerAsync(): DynamicModule {
    const OpenAIProvider: Provider = {
      provide: OpenAI,
      useFactory: async (configService: ConfigService) => {
        const apiKey = configService.get<string>('OPENAI_API_KEY');
        return new OpenAI({
          apiKey: apiKey,
        });
      },
      inject: [ConfigService],
    };
    return {
      module: OpenAIModule,
      imports: [ConfigModule],
      providers: [OpenAIProvider],
      exports: [OpenAIProvider],
    };
  }
}
