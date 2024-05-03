/// <reference types="vite/client" />
import { DiscordSDK } from '@discord/embedded-app-sdk';

export const sdkClient = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);
