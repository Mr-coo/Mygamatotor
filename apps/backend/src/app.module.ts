import { Module } from '@nestjs/common';
import { GameGateway } from './game/game.gateway';
import { GameLoop } from './game/gameLoop.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [],
  providers: [GameGateway, GameLoop],
})
export class AppModule {}
