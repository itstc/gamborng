import React, { useRef } from 'react';
import { RigidBody, useRapier } from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import { Bob } from './components/Bob';
import { usePlayers } from './hooks/usePlayers';
import { updatePlayerPosition } from './utils/movement';

export default function Experience(props) {
  const playerContext = usePlayers();
  const playerRef = useRef();
  const rapier = useRapier();
  const [, get] = useKeyboardControls();

  useFrame(() => {
    if (rapier.world) {
      updatePlayerPosition(playerRef, get(), rapier);
    }
  });

  return playerContext?.map(({ userId, avatarUrl }) => {
    return (
      <RigidBody
        ref={playerRef}
        key={`user-${userId}`}
        colliders="hull"
        type="dynamic"
        mass={1}
        enabledRotations={[false, true, false]}
        position={[0, 2, 0]}
      >
        <Bob avatar={avatarUrl} />
      </RigidBody>
    );
  });
}
