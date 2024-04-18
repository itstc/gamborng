import React, { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';

import { useAuthContext } from './hooks/useAuthContext';
import { usePlayers } from './hooks/usePlayers';

import Experience from './Experience';

export default function App() {
  const authContext = useAuthContext();

  return (
    <>
      <Canvas style={{ width: '100%', height: '100%' }}>
        <Suspense fallback={null}>
          <Physics debug>
            <hemisphereLight skyColor={'white'} groundColor={'darkslategrey'} intensity={5} />
            <OrbitControls />
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
      {/**
       *       <div className="container">
        <h1>{authContext?.guildMember?.name}</h1>
        <button className="rng-btn" onClick={displayRoll}>
          Roll
        </button>
        {rolling && <RollPanel onClose={closePanel} />}
      </div>
       * 
       */}
    </>
  );
}
