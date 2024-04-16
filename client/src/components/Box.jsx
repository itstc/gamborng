import { useTexture } from '@react-three/drei';
import React from 'react';

export function Box(props) {
  const texture = useTexture([props.avatar]);

  texture[0].repeat.set(4, 4);

  console.log('===', texture);

  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial map={texture[0]} />
    </mesh>
  );
}
