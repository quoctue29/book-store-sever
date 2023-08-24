import './global';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(helmet());
  app.use(compression());
  app.enableVersioning({ type: VersioningType.URI });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Book Store Portal API')
    .setDescription('Book Store Portal API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    customSiteTitle: 'Book Store Server Document APIs',
  });

  const port = configService.get('PORT') || 3000;
  await app.listen(port);
  Logger.log(`Application is running on: http://localhost:${port}/api`);
  Logger.log(`Swagger on: http://localhost:${port}/swagger`);
}
bootstrap();
