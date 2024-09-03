import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  // Apply global validation pipes for incoming requests
  app.useGlobalPipes(new ValidationPipe());

  // Apply global exception filters to handle all exceptions centrally
  app.useGlobalFilters(new AllExceptionsFilter());

  // Enable CORS for cross-origin requests
  app.enableCors();

  // Start listening on the configured port
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
