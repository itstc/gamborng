import React from 'react';

const AuthContext = React.createContext({
    guildMember: null,
    accessToken: '',
    scopes: []
});

export function AuthContextProvider({ children }) {
    const authContext = useAuthContextSetup();

    if (authContext == null) {
        return <div>Loading...</div>;
    }

    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}

export function useAuthContextSetup() {
    
}