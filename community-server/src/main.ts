import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('community');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Doctornow Test Project')
    .setDescription('The Community API description')
    .setVersion('1.0')
    .addTag('Community')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('community/docs', app, document);

  await app.listen(4000);
}
bootstrap();
