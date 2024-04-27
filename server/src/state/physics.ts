//import * as THREE from 'three';
//import { ExtendedObject3D, Physics, ServerClock } from '@enable3d/ammo-on-nodejs';
//import { Player } from '../entities/Player';
//import { StateHandlerRoom } from '../rooms/StateHandlerRoom';
//
//const ORIGIN = new THREE.Vector3();
//
//export class ServerScene {
//  physics: any;
//  factory: any;
//
//  physicsClock: ServerClock = new ServerClock(32);
//  emitClock: ServerClock = new ServerClock(1);
//
//  objects: Map<string, ExtendedObject3D | EntityPhysics> = new Map();
//
//  eventQueue: { type: string; entity: string }[] = [];
//  room: StateHandlerRoom;
//
//  constructor(room: StateHandlerRoom) {
//    this.room = room;
//    this.physics = new Physics();
//    this.factory = this.physics.factory;
//
//    this.init();
//    this.create();
//
//    if (process.env.NODE_ENV !== 'production') {
//      this.physicsClock.disableHighAccuracy();
//    }
//
//    this.physicsClock.onTick((delta: number) => this.update(delta));
//    this.emitClock.onTick(() => {
//      for (const entity of this.objects.values()) {
//        if (entity instanceof EntityPhysics) {
//          entity.entity.body.transform();
//          entity.entity.body.refresh();
//          const { x, y, z } = entity.entity.body.position;
//          console.log(entity.entityData.sessionId, x, y, z);
//          entity.entityData.x = x;
//          entity.entityData.y = y;
//          entity.entityData.z = z;
//        }
//      }
//    });
//  }
//
//  init() {}
//
//  create() {
//    const ground = this.physics.add.ground({
//      name: 'ground',
//      width: 21,
//      height: 21,
//      depth: 1,
//      y: -0.5,
//    });
//    ground.body.setCollisionFlags(1);
//
//    const bound = this.physics.add.ground({
//      name: 'bound',
//      width: 1000,
//      height: 1000,
//      collisionFlags: 1,
//    });
//    bound.position.set(0, -30, 0);
//
//    this.objects.set('ground', ground);
//    this.objects.set('bound', bound);
//  }
//
//  update(delta: number) {
//    this.physics.update(delta * 1000);
//  }
//
//  cleanup() {
//    this.physicsClock?.stop();
//  }
//
//  createEntity(playerData: Player) {
//    const box = this.physics.add.box({
//      name: playerData.sessionId,
//      x: playerData.x,
//      y: playerData.y,
//      z: playerData.z,
//      collisionFlags: 0,
//    });
//    const obj = new EntityPhysics(this.physics, box, playerData);
//    this.objects.set(playerData.sessionId, obj);
//  }
//
//  removeEntity(key: string) {
//    this.objects.delete(key);
//  }
//}
//
//export class EntityPhysics {
//  physics: Physics;
//  entity: ExtendedObject3D;
//  entityData: Player;
//
//  constructor(physics: Physics, entity: ExtendedObject3D, entityData: Player) {
//    this.physics = physics;
//    this.entity = entity;
//    this.entityData = entityData;
//  }
//
//  update(delta: number) {
//    //const rotPlayer = this.entity.getWorldDirection(ORIGIN);
//    //const thetaPlayer = Math.atan2(rotPlayer.x, rotPlayer.z);
//    //const theta = this.entityData.rotation;
//    //this.entity.body.setAngularVelocityY(0);
//    //const l = Math.abs(theta - thetaPlayer);
//    //let rotSpeed = 4;
//    //let d = Math.PI / 24;
//    //if (l > d) {
//    //  if (l > Math.PI - d) {
//    //    rotSpeed *= -1;
//    //  }
//    //  if (theta < thetaPlayer) {
//    //    rotSpeed *= -1;
//    //  }
//    //  this.entity.body.setAngularVelocityY(rotSpeed);
//    //}
//    //const { x: rx, y: ry, z: rz } = this.entity.body.rotation;
//    //const { x, y, z } = this.entity.body.position;
//    //this.entityData.x = x;
//    //this.entityData.y = y;
//    //this.entityData.z = z;
//  }
//}
//
