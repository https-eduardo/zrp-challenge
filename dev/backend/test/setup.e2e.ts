import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as cookieParser from 'cookie-parser';
import { PrismaClient, User } from '@prisma/client';
import { getMockUser } from 'src/modules/users/__tests__/__mocks__/user.mock';
import * as bcrypt from 'bcryptjs';

export let app: INestApplication;
export let createdUser: User;

async function setupUser(prisma: PrismaClient) {
  const mockUser = getMockUser();
  mockUser.email = 'mockuser@created.com';

  const hashedPassword = bcrypt.hashSync(mockUser.password);
  createdUser = await prisma.user.upsert({
    where: { email: mockUser.email },
    update: { ...mockUser, password: hashedPassword },
    create: {
      ...mockUser,
      password: hashedPassword,
    },
  });
  createdUser.password = mockUser.password;
}

global.beforeAll(async () => {
  const prisma = new PrismaClient();

  await setupUser(prisma);
});

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
