import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as cookieParser from 'cookie-parser';

export let app: INestApplication;

global.beforeEach(async () => {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: process.env.ORIGIN ?? '*',
    credentials: true,
  });
  app.use(cookieParser());

  await app.init();
});

global.afterAll(async () => {
  await app.close();
});
