import React from 'react';
import ReactDOM from 'react-dom/client';

import { AuthContextProvider } from './hooks/useAuthContext';

import './style.css';

import App from './App';

ReactDOM.createRoot(document.querySelector('#app')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
);
