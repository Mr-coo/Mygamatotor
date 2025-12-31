import type { EventSocket } from "@game/shared";
import { io } from "socket.io-client";

class NetworkClient {
    private socket: ReturnType<typeof io>;

    constructor() {
        console.trace("Connecting to server...");
        this.socket = io('http://localhost:3000/game', {
            autoConnect: false,
        });
    }

    sendCommand(event : EventSocket, data : any): void {
        this.socket.emit(event.toString(), data);
    }

    on(event : EventSocket, callback: (...args: any[]) => void): void {
        this.socket.on(event.toString(), callback);
    }

    getClientId() : string | undefined {
        return this.socket.id;
    }

    connect(){
        this.socket.connect();
    }

    disconnect(){
        this.socket.disconnect();
    }
}

export const networkClient = new NetworkClient();