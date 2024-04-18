import React from 'react';
import { RigidBody } from '@react-three/rapier';

import { Bob } from './components/Bob';
import { Map } from './components/Map';
import { usePlayers } from './hooks/usePlayers';

export default function Experience(props) {
  const playerContext = usePlayers();

  return (
    <>
      <RigidBody colliders="trimesh" type="fixed">
        <Map />
      </RigidBody>
      {playerContext?.map(({ userId, avatarUrl }) => {
        return (
          <RigidBody key={`user-${userId}`} colliders={false}>
            <Bob avatar={avatarUrl} position={[0, 0, 0]} />
          </RigidBody>
        );
      })}
    </>
  );
}
