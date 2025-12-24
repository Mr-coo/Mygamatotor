import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { GameLoop } from './game.loop';

@Module({
    providers: [EventsGateway, GameLoop],
})
export class EventsModule {}
