import { FLAT } from '@enable3d/phaser-extension';
import { ExtendedObject3D } from '@enable3d/ammo-physics';
import { Room } from 'colyseus.js';

import { PlayerData } from '../types';

import MainScene from '../scenes/mainScene';
import { getRandomPosition } from './position';

export function createPlayer(gameState: MainScene, name: string, host = false): ExtendedObject3D {
  const entity = new ExtendedObject3D();
  entity.name = name;
  entity.add(gameState.assets.bob.scene.clone());

  entity.rotateY(Math.PI + 0.1);
  entity.rotation.set(0, Math.PI * 1.5, 0);
  let px = 0;
  let py = 0;
  let pz = 0;

  if (host) {
    const [x, y, z] = getRandomPosition();
    px = x;
    py = y;
    pz = z;
  }

  entity.position.set(px, py, pz);
  if (host) {
    gameState.third.physics.add.existing(entity, {
      shape: 'sphere',
      radius: 0.25,
      width: 0.5,
      offset: { y: -0.25 },
    });

    entity.body.setFriction(0.8);
    entity.body.setAngularFactor(0, 0, 0);
  }

  // add nametag
  const texture = new FLAT.TextTexture(name);
  const sprite3d = new FLAT.TextSprite(texture);
  entity.add(sprite3d);
  sprite3d.position.set(0, 2, 0);
  sprite3d.setScale(0.005);

  gameState.third.add.existing(entity);

  return entity;
}

export class EntityManager {
  private room: Room<any>;
  private game: MainScene;
  private playerCallback: (player: ExtendedObject3D) => void;

  player?: ExtendedObject3D;

  entities: Map<string, ExtendedObject3D> = new Map();

  constructor(gameState: MainScene, room: Room, playerCallback: (player: ExtendedObject3D) => void = () => null) {
    this.game = gameState;
    this.room = room;

    this.playerCallback = playerCallback;
    // spawn current players in room
    for (const player of this.room.state.players) {
      this.addEntity(player);
    }

    // register event listeners when players change
    this.room.state.players.onAdd(this.addEntity.bind(this));
    this.room.state.players.onRemove(this.removeEntity.bind(this));
  }

  private addEntity(newPlayer: any) {
    const { sessionId, userId, name } = newPlayer as PlayerData;
    const isHost = userId === this.game.serverClient.clientId;
    const entity = createPlayer(this.game, name, isHost);
    this.entities.set(sessionId, entity);

    if (isHost) {
      this.playerCallback(entity);
      this.player = entity;
    }
  }

  private removeEntity({ sessionId }: PlayerData) {
    const entity = this.entities.get(sessionId);
    if (entity) {
      this.game.third.scene.remove(entity);
      this.entities.delete(sessionId);
    }
  }

  getEntity(sessionId: string): [ExtendedObject3D, PlayerData] | undefined {
    const entity = this.entities.get(sessionId);
    if (!entity) {
      return undefined;
    }
    return [entity, this.room.state.players.get(sessionId)];
  }

  getEntities(): [ExtendedObject3D, PlayerData][] {
    const res: [ExtendedObject3D, PlayerData][] = [];
    for (const id of this.entities.keys()) {
      const data = this.getEntity(id);
      if (data) {
        res.push(data);
      }
    }

    return res;
  }
}
