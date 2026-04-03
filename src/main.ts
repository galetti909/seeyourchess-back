import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaErrorInterceptor } from './common/interceptors/prisma.interceptor';
import { GlobalExceptionFilter } from './common/filters/global.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: false,
      },
    }),
  );

  app.useGlobalInterceptors(new PrismaErrorInterceptor());

  app.useGlobalFilters(new GlobalExceptionFilter());

  const docs_config = new DocumentBuilder()
    .setTitle('See Your Chess API')
    .setDescription('Documentation of See Your Chess API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, docs_config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  Logger.error('❌ Error during app bootstrap:', err);
  process.exit(1);
});
