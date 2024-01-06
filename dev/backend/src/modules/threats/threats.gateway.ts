import { WebSocketGateway } from '@nestjs/websockets';
import { ThreatsService } from './threats.service';
import { OnModuleInit } from '@nestjs/common';
import { Socket, io } from 'socket.io-client';
import { ThreatOccurence } from 'src/common/types/occurrence.payload';

@WebSocketGateway()
export class ThreatsGateway implements OnModuleInit {
  private socket: Socket;

  constructor(private readonly service: ThreatsService) {}

  onModuleInit() {
    this.socket = io(process.env.SOCKET_URL);

    this.socket.on('occurrence', (occurrence: ThreatOccurence) => {
      this.service.handleOccurrence(occurrence);
    });
  }
}
