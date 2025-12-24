import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { EventsGateway } from './events/events.gateway';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    PrismaModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    }), UserModule, EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, EventsGateway],
})
export class AppModule {}
