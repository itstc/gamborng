import React, { useState } from 'react';

import { useAuthContext } from './useAuthContext';

const PlayersContext = React.createContext([]);

export function PlayersContextProvider({ children }) {
  const players = usePlayersContextSetup();

  return <PlayersContext.Provider value={players}>{children}</PlayersContext.Provider>;
}

export function usePlayers() {
  return React.useContext(PlayersContext);
}

function changePlayer(players, changes, id) {
  return players.map((p) => {
    if (p.userId === id) {
      changes.forEach(({ f, v }) => {
        p[f] = v;
      });
    }
    return p;
  });
}

function usePlayersContextSetup() {
  const [players, setPlayers] = useState([]);

  const authContext = useAuthContext();

  // add listeners to room to track players
  React.useEffect(() => {
    try {
      authContext.room.state.players.onAdd = function (player, _key) {
        setPlayers((players) => [...players, player]);
        player.onChange = function (changes) {
          setPlayers((players) => changePlayer(players, changes, player.userId));
        };
      };

      authContext.room.state.players.onRemove = function (player, _key) {
        setPlayers((players) => players.filter((p) => p.userId !== player.userId));
      };
    } catch {
      /* no-op */
    }
  }, [authContext.room]);

  return players;
}
