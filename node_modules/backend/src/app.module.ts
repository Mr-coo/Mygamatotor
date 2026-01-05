import { Module } from '@nestjs/common';
import { GameGateway } from './game/game.gateway';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GameRoomManager } from './game/game-room-manager';

@Module({
  imports: [PrismaModule, UserModule, AuthModule],
  controllers: [],
  providers: [GameGateway, GameRoomManager],
})
export class AppModule {}
