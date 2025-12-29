import { Module } from '@nestjs/common';
import { GameGateway } from './game/game.gateway';
import { GameLoop } from './game/gameLoop.service';

@Module({
  imports: [],
  controllers: [],
  providers: [GameGateway, GameLoop],
})
export class AppModule {}
