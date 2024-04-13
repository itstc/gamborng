import React, { useCallback, useState } from 'react';
import { useAuthContext } from './hooks/useAuthContext';
import { getUserAvatarUrl } from './utils/cdn';

import { RollPanel } from './RollPanel';

export default function App() {
  const authContext = useAuthContext();
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
        <img src={getUserAvatarUrl(authContext)} className="logo" alt="User" />
        <button className="rng-btn" onClick={displayRoll}>
          Roll
        </button>
      </div>
      {rolling && <RollPanel onClose={closePanel} />}
    </>
  );
}
