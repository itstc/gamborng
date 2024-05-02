import { Room, Client } from 'colyseus';
import { TPlayerOptions } from '../entities/Player';
import { State, IState } from '../entities/State';

export class StateHandlerRoom extends Room<State> {
  maxClients = 1000;

  onCreate(options: IState) {
    this.setState(new State(options));

    this.onMessage('entity_update', (client, _data) => {
      this.broadcast('entity_update', { entity: client.sessionId, ..._data }, { except: client });
    });
  }

  onAuth(_client: any, _options: any, _req: any) {
    return true;
  }

  onJoin(client: Client, options: TPlayerOptions) {
    console.log('=== player joined', client.sessionId, options);
    this.state.createPlayer(client.sessionId, options);
  }

  onLeave(client: Client) {
    console.log('=== player leave', client.sessionId);
    this.state.removePlayer(client.sessionId);
  }

  onDispose() {
    console.log('Dispose StateHandlerRoom');
  }
}
