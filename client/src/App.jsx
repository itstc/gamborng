import React, { Suspense, useMemo } from 'react';
import { KeyboardControls, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';

import Experience from './Experience';
import { Map } from './components/Map';

export default function App() {
  const keyMap = useMemo(
    () => [
      { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
      { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
      { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
      { name: 'right', keys: ['ArrowRight', 'KeyD'] },
      { name: 'jump', keys: ['Space'] },
    ],
    [],
  );
  return (
    <KeyboardControls map={keyMap}>
      <Canvas style={{ width: '100%', height: '100%' }}>
        <hemisphereLight skyColor={'white'} groundColor={'darkslategrey'} intensity={5} />
        <OrbitControls />
        <Suspense>
          <Physics gravity={[0, -30, 0]} interpolation={false} colliders={false}>
            <RigidBody colliders={false} type="fixed">
              <Map />
            </RigidBody>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
    </KeyboardControls>
  );
}
