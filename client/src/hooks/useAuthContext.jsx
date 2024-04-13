import React, { useContext, useEffect, useRef, useState } from 'react';
import { setupDiscordSdk } from '../utils/auth';

const AuthContext = React.createContext({
  guildMember: null,
  accessToken: '',
  scopes: [],
});

export function AuthContextProvider({ children }) {
  const authContext = useAuthContextSetup();

  console.log(JSON.stringify(authContext));

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
      setup.current = true;
      setupDiscordSdk().then((result) => setAuth(result));
    }
  }, []);

  return auth;
}
