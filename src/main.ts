import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './helpers/responseInterceptor';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { useContainer, ValidationError } from 'class-validator';
import { HttpExceptionFilter } from './helpers/http-exception.filter';
import { json, urlencoded } from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.use(morgan('tiny'));

  app.useGlobalPipes(
    new ValidationPipe({
      validationError: {
        target: false,
      },
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException(errors);
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Kado-ramp assessment')
    .setDescription('Kado-ramp assessment API description')
    .setVersion('1.0')
    .addTag('kado')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT || 6000;
  const nodeEnv = process.env.NODE_ENV || 'development';

  await app.listen(PORT, () =>
    console.info(`Application running in ${nodeEnv} mode on port ${PORT}`),
  );
}

bootstrap();
