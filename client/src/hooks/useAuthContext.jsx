import React, { useContext, useEffect, useRef, useState } from 'react';
import { setupDiscordSdk } from '../utils/auth';
import { setupGameState } from '../utils/game';

const AuthContext = React.createContext({
  guildMember: null,
  accessToken: '',
  scopes: [],
  client: undefined,
  room: undefined,
});

export function AuthContextProvider({ children }) {
  const authContext = useAuthContextSetup();

  if (!authContext) {
    return <h1>Loading...</h1>;
  }

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}

export function useAuthContextSetup() {
  const [auth, setAuth] = useState(null);
  const setup = useRef(false);

  useEffect(() => {
    if (!setup.current) {
      (async () => {
        setup.current = true;
        const playerAuth = await setupDiscordSdk();
        const gameState = await setupGameState(playerAuth);
        setAuth({ ...playerAuth, ...gameState });
      })();
    }
  }, []);

  return auth;
}
