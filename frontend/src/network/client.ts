import type { InputCommand } from "./protocol";

export class NetworkClient {
    private socket: WebSocket
    constructor() {
        this.socket = new WebSocket('ws://localhost:8080');

        this.socket.onopen = () => {
            console.log('WebSocket connection established');
        };
    }

    sendInput(cmd: InputCommand) {
        this.socket.send(JSON.stringify({
        type: 'player:input',
        payload: cmd
        }));
    }
}
