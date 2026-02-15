import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger : new ConsoleLogger({
      colors : true,
      json : true,
      logLevels: ['log','error'],
    })
  });
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 1000);
}
bootstrap();
