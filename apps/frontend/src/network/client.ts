import type { InputCommand } from '@game/shared';
import { io } from 'socket.io-client';

export class NetworkClient {
    private socket: ReturnType<typeof io>;

    constructor() {
        this.socket = io('http://localhost:3000/events'); 
    }

    sendCommand(command: InputCommand): void {
        console.log(`Sending command: ${JSON.stringify(command)}`);
        this.socket.emit('inputCommand', command);
    }

    on(event: string, callback: (...args: any[]) => void): void {
        console.log(`Registering event listener for: ${event}`);
        this.socket.on(event, callback);
    }
}
