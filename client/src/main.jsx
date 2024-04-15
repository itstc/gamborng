import React from 'react';
import ReactDOM from 'react-dom/client';

import { AuthContextProvider } from './hooks/useAuthContext';
import { PlayersContextProvider } from './hooks/usePlayers';

import './style.css';

import App from './App';

ReactDOM.createRoot(document.querySelector('#app')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <PlayersContextProvider>
        <App />
      </PlayersContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);
