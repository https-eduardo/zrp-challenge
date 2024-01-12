import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ThreatsService } from './threats.service';
import { OnModuleInit } from '@nestjs/common';
import { Socket, io } from 'socket.io-client';
import { ThreatOccurence } from '../../common/types/occurrence.payload';
import { HeroesService } from '../heroes/heroes.service';

@WebSocketGateway({
  cors: { origin: process.env.ORIGIN },
})
export class ThreatsGateway implements OnModuleInit {
  @WebSocketServer()
  private socketServer: Socket;

  private socket: Socket;

  constructor(
    private readonly service: ThreatsService,
    private readonly heroesService: HeroesService,
  ) {}

  @SubscribeMessage('getActiveAllocations')
  async handleGetActiveAllocation() {
    const activeAllocations = await this.service.getActiveAllocations();
    return activeAllocations;
  }

  async onModuleInit() {
    await this.heroesService.markAllHeroesAsAvailable();
    this.socket = io(process.env.SOCKET_URL);

    this.socket.on('occurrence', async (occurrence: ThreatOccurence) => {
      const allocation = await this.service.handleOccurrence(occurrence);

      if (allocation) return this.socketServer.emit('allocation', allocation);

      this.socketServer.emit('allocationFailed', {
        threatName: occurrence.monster.name,
        threatRank: occurrence.dangerLevel,
      });
    });
  }
}
