/// <reference types="vite/client" />
import { DiscordSDK } from '@discord/embedded-app-sdk';
import { DiscordUserContext } from './utils/auth';

export const sdkClient = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);

export class DiscordUserContextSingleton {
  static memPool: Record<string, unknown> = {};

  static setDiscordUserContext(userContext: DiscordUserContext): DiscordUserContext {
    DiscordUserContextSingleton.memPool.userContext = userContext;
    return userContext;
  }

  static getDiscordUserContext(): DiscordUserContext {
    if (DiscordUserContextSingleton.memPool.userContext) {
      return DiscordUserContextSingleton.memPool.userContext;
    }
    throw new Error('Discord user context not set yet!');
  }
}
