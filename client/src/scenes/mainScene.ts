import { ClosestRaycaster } from '@enable3d/ammo-physics';
import { ExtendedObject3D, Scene3D, FLAT } from '@enable3d/phaser-extension';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GameServerClient } from '../services/gameServer';
import { EntityManager } from '../utils/entity';
import { teleport } from '../utils/position';
import { DiscordUserContext } from '../utils/auth';
import { getUserAvatarUrl, getUserDisplayName } from '../utils/user';

let userContext: DiscordUserContext;

export default class MainScene extends Scene3D {
  private ui?: FLAT.FlatArea;
  private keyMap?: Record<string, Phaser.Input.Keyboard.Key>;
  private camera?: THREE.Object3D;

  private bound?: ExtendedObject3D;
  private entityManager?: EntityManager;

  assets: Record<string, GLTF> = {};
  serverClient: GameServerClient;

  constructor() {
    super({ key: 'MainScene' });
    this.serverClient = new GameServerClient();
  }

  async preload() {
    await this.third.load.preload('bob', `/models/Bob.glb`);
  }

  async init() {
    this.accessThirdDimension();
    const room = await this.serverClient.joinOrCreate(
      getUserDisplayName(window.userContext),
      getUserAvatarUrl(window.userContext),
    );
    this.entityManager = new EntityManager(this, room, (player) => {
      this.targetCameraToPlayer(player);
      this.time.addEvent({
        loop: true,
        delay: 60,
        callback: () => {
          room.send('entity_update', {
            rotation: player.rotation.toArray(),
            position: player.position.toArray().map((val) => val.toFixed(2)),
          });
        },
      });
    });
  }

  async create() {
    // creates a nice scene
    await this.third.warpSpeed('-orbitControls');

    this.ui = FLAT.init(this.third.renderer);

    this.bound = this.third.add.ground(
      { width: 1000, height: 1000 },
      {
        standard: {
          color: '#000',
        },
      },
    );
    this.bound.position.set(0, -30, 0);
    this.third.physics.add.existing(this.bound, { collisionFlags: 1 });

    this.assets.bob = await this.third.load.gltf('/models/Bob.glb');

    this.keyMap = this.input.keyboard?.addKeys('W, S, A, D, SPACE') as any;
  }

  targetCameraToPlayer(player: ExtendedObject3D) {
    if (this.third.camera) {
      const followCam = new THREE.Object3D();
      followCam.position.copy(new THREE.Vector3(0, 2, -7));
      player.add(followCam);

      this.camera = followCam;
    }
  }

  update() {
    if (!this.entityManager?.player || !this.camera) {
      return;
    }
    const SPEED = 3;
    const player = this.entityManager.player;
    const pos = player.position.clone();
    // point camera to player position
    this.third.camera.position.lerp(this.camera.getWorldPosition(new THREE.Vector3()), 0.05);
    this.third.camera.lookAt(pos.x, pos.y + 2, pos.z);
    // process server events
    const event: any = this.serverClient.dequeue();
    if (event && event.type === 'entity_update') {
      const [rx, ry, rz] = event.data.rotation;
      const [px, py, pz] = event.data.position;
      this.entityManager.getEntity(event.data.entity)?.[0].rotation.set(rx, ry, rz);
      this.entityManager.getEntity(event.data.entity)?.[0].position.set(px, py, pz);
    }
    // capture player movement
    if (this.keyMap?.W.isDown || this.keyMap?.S.isDown) {
      const dir = this.keyMap.W.isDown ? 1 : -1;
      const rotation = player.getWorldDirection(new THREE.Vector3()?.setFromEuler?.(player.rotation));
      const theta = Math.atan2(rotation.x, rotation.z);
      const x = Math.sin(theta) * dir * SPEED,
        y = player.body.velocity.y,
        z = Math.cos(theta) * dir * SPEED;
      player.body.setVelocity(x, y, z);
    }
    if (this.keyMap?.A.isDown) {
      player.body.setAngularVelocityY(SPEED);
    } else if (this.keyMap?.D.isDown) {
      player.body.setAngularVelocityY(-SPEED);
    } else {
      player.body.setAngularVelocityY(0);
    }
    const playerPos = player.body.position;
    const jumpRay = this.third.physics.add.raycaster('closest') as ClosestRaycaster;
    jumpRay.setRayFromWorld(playerPos.x, playerPos.y, playerPos.z);
    jumpRay.setRayToWorld(playerPos.x, playerPos.y - 0.5, playerPos.z);
    jumpRay.rayTest();
    if (this.keyMap?.SPACE.isDown && jumpRay.hasHit()) {
      this.keyMap.SPACE.isDown = false;
      player.body.applyForceY(4);
    }
    if (jumpRay.hasHit() && jumpRay.getCollisionObject() === this.bound) {
      teleport(player, [0, 0, 0]);
    }
    jumpRay.destroy();
  }
}
