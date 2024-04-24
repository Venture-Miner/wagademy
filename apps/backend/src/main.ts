import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { ErrorFilter } from './filters/error.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    logger: ['error', 'warn', 'debug', 'verbose', 'log', 'fatal'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );
  app.useGlobalFilters(new ErrorFilter());
  const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  };
  app.enableCors(corsOptions);
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('Wagademy API')
    .setDescription('Wagademy Api')
    .setVersion('2.0')
    .addTag('Wagademy API')
    .addBearerAuth({
      bearerFormat: 'Bearer',
      type: 'http',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const globalPrefix = 'api';
  SwaggerModule.setup(globalPrefix, app, document);
  const port = configService.get('PORT') || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
