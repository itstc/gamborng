import { quat, euler, vec3 } from '@react-three/rapier';
import * as RAPIER from '@dimforge/rapier3d-compat';

const SPEED = 5;
const ROTATION_SPEED = 3;
const vel = vec3();

export function updatePlayerPosition(playerRef, keyboardState, rapier) {
  if (!playerRef?.current) {
    return;
  }

  const { forward, backward, left, right, jump } = keyboardState;

  const rotVelocity = { x: 0, y: 0, z: 0 };
  const velocity = playerRef.current.linvel();

  vel.x = vel.z = 0;
  vel.y = velocity.y;

  if (forward) {
    vel.z += SPEED;
  }
  if (backward) {
    vel.z -= SPEED;
  }
  if (left) {
    rotVelocity.y += ROTATION_SPEED;
  }
  if (right) {
    rotVelocity.y -= ROTATION_SPEED;
  }

  playerRef.current.setAngvel(rotVelocity);
  const eulerRot = euler().setFromQuaternion(quat(playerRef.current.rotation()));
  vel.applyEuler(eulerRot);

  playerRef.current.setLinvel(vel);

  //const playerTranslation = playerRef.current.translation();
  //const ray = rapier.world?.castRay(new RAPIER.Ray(playerTranslation, { x: 0, y: -1, z: 0 }));
  //const grounded = ray?.colliders && Math.abs(ray.toi) <= 1.75;
  //if (jump && grounded) {
  //  playerRef.current.setLinvel({ x: 0, y: 7.5, z: 0 });
  //}
}
