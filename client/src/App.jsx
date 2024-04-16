import React, { useCallback, useState } from 'react';
import { OrbitControls } from '@react-three/drei';

import { Box } from './components/Box';

import { useAuthContext } from './hooks/useAuthContext';

import { RollPanel } from './RollPanel';
import { usePlayers } from './hooks/usePlayers';

import { Bob } from './components/Bob';
import { Canvas } from '@react-three/fiber';

export default function App() {
  const authContext = useAuthContext();
  const playerContext = usePlayers();

  const [rolling, setRolling] = useState(false);

  const displayRoll = useCallback(() => {
    setRolling(true);
  }, []);

  const closePanel = useCallback(() => {
    setRolling(false);
  }, []);

  return (
    <Canvas style={{ width: '100%', height: '100%' }}>
      <hemisphereLight skyColor={'white'} groundColor={'darkslategrey'} intensity={5} />
      <OrbitControls />
      {playerContext?.map(({ userId, avatarUrl }) => {
        return <Bob key={`user-${userId}`} avatar={avatarUrl} />;
      })}
      {/*
      <div className="container">
        <h1>{authContext?.guildMember?.name}</h1>
        <button className="rng-btn" onClick={displayRoll}>
          Roll
        </button>
      </div>
      {rolling && <RollPanel onClose={closePanel} />}
    */}
    </Canvas>
  );
}
