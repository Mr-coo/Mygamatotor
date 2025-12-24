import type { Input, InputCommand } from '@game/shared';
import { io } from 'socket.io-client';

export class NetworkClient {
    private socket: ReturnType<typeof io>;

    constructor() {
        this.socket = io('http://localhost:3000/events'); 
    }

    sendCommand(command: Input): void {
        console.log(`Sending command: ${JSON.stringify(command)}`);
        this.socket.emit('inputCommand', command);
    }

    on(callback: (...args: any[]) => void): void {
        this.socket.on('snapshot', callback);
    }
}
