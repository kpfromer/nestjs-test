import { addPath } from 'app-module-path';
addPath(__dirname);

import 'zone.js';
import 'zone.js/dist/zone-node.js';
import 'zone.js/dist/long-stack-trace-zone.js';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { ValidationPipe } from '@nestjs/common';
import * as Config from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle(Config.get('/projectName'))
    .setDescription('The cats API description')
    .setVersion(Config.get('/version'))
    .addBearerAuth('Authorization', 'header')
    .setBasePath('v1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`/${Config.get('/swaggerUrl')}`, app, document);

  await app.listen(Config.get('/port'));
}
bootstrap();
