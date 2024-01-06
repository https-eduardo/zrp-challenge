import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { HeroesModule } from './modules/heroes/heroes.module';
import { ThreatsModule } from './modules/threats/threats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    HeroesModule,
    ThreatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
