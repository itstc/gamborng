import { Client, Room } from 'colyseus.js';
import { MathUtils } from 'three';

interface IServerEvent {
  type: string;
  data: unknown;
}

export class GameServerClient {
  static WS_ENDPOINT = `ws://${location.host}/api/colyseus`;

  client: Client;
  room?: Room;

  clientId: string;

  eventQueue: IServerEvent[] = [];

  constructor() {
    this.client = new Client(GameServerClient.WS_ENDPOINT);
    this.clientId = '';
  }

  async joinOrCreate(name: string, avatarUrl: string) {
    this.clientId = MathUtils.generateUUID();
    this.room = await this.client.joinOrCreate('rng_room', {
      channelId: '123',
      roomName: 'test',
      userId: this.clientId,
      name,
      avatarUrl,
    });

    this.room.onMessage('*', (type, data) => {
      this.enqueue({ type: type as string, data });
    });
    return this.room;
  }

  dequeue() {
    if (this.eventQueue.length > 0) {
      return this.eventQueue.shift();
    }

    return undefined;
  }

  enqueue(event: IServerEvent) {
    this.eventQueue.push(event);
  }
}
