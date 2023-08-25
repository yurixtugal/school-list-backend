import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv'

async function bootstrap() {
  dotenv.config();
  console.log(process.env.JWT_SECRET)
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  const config = new DocumentBuilder()
  .setTitle('School List')
  .setDescription('The school list API')
  .setVersion('1.0')
  .addTag('school-list')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();
