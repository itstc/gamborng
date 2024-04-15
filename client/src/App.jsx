import React, { useCallback, useState } from 'react';
import { useAuthContext } from './hooks/useAuthContext';

import { RollPanel } from './RollPanel';
import { usePlayers } from './hooks/usePlayers';

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
    <>
      <div className="container">
        <h1>{authContext?.guildMember?.name}</h1>
        <div className="player-container">
          {playerContext?.map((p) => {
            return (
              <div key={`user-${p.id}`}>
                <img src={p.avatarUrl} className="logo" alt="User" />
                <h4>{p.name}</h4>
              </div>
            );
          })}
        </div>
        <button className="rng-btn" onClick={displayRoll}>
          Roll
        </button>
      </div>
      {rolling && <RollPanel onClose={closePanel} />}
    </>
  );
}
