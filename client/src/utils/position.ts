import { ExtendedObject3D } from '@enable3d/ammo-physics';

const resetCollision = (entity: ExtendedObject3D) => {
  entity.body.setCollisionFlags(0);
  entity.body.setVelocity(0, 0, 0);
  entity.body.setAngularVelocity(0, 0, 0);
};

export function getRandomPosition() {
  return [Math.random() * 5, 0, Math.random() * 5];
}

export function teleport(entity: ExtendedObject3D, [x, y, z]: number[]) {
  entity.body.setCollisionFlags(2);
  entity.position.set(x, y, z);
  entity.body.needUpdate = true;
  entity.body.once.update(() => {
    resetCollision(entity);
  });
}
