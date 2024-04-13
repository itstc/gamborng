import React from 'react';
import ReactDOM from 'react-dom/client';
import { DiscordSDK } from '@discord/embedded-app-sdk';

import { setupDiscordSdk, appendGuildAvatar, appendVoiceChannelName } from './utils/auth';

import './style.css';

import App from './App';

// Will eventually store the authenticated user's access_token
let auth;

const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);

setupDiscordSdk(discordSdk).then((authRes) => {
  if (authRes) {
    auth = authRes;
    //appendVoiceChannelName(discordSdk, auth);
    //appendGuildAvatar(discordSdk, auth);
  }
});

ReactDOM.createRoot(document.querySelector('#app')).render(<React.StrictMode><App/></React.StrictMode>);