import { Socket } from "socket.io";
import { JwtStrategtService } from "./jwt-strategy.service";

export const socketJwtMiddleware =
  (jwtService: JwtStrategtService) =>
  async (socket: Socket, next: (err?: Error) => void) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) throw new Error('Missing token');

      const payload = await jwtService.validate(token);
      socket.data.user = payload; 
      next();
    } catch {
      next(new Error('Unauthorized'));
    }
  };
