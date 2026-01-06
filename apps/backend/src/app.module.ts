import { Module } from '@nestjs/common';
import { GameGateway } from './game/game.gateway';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GameRoomManager } from './game/game-room-manager';
import { JwtStrategtService } from './auth/jwt-strategy.service';

@Module({
  imports: [PrismaModule, UserModule, AuthModule],
  controllers: [],
  providers: [GameGateway, GameRoomManager, JwtStrategtService],
})
export class AppModule {}
