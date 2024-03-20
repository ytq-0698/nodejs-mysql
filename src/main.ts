import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const docConfig = new DocumentBuilder()
    .setTitle('APIs  docs')
    .setDescription('Demo APIs for simple app')
    .setVersion('0.1')
    .addTag('Auth')
    .addTag('Users')
    .build();
  const docs = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('api', app, docs);
  app.useGlobalPipes(new ValidationPipe());
  const PORT = 3000;
  await app.listen(PORT, () => {
    console.log(`App start with port ${PORT}`);
  });
}
bootstrap();
