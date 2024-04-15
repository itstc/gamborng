import { Client } from 'colyseus.js';
import { sdkClient } from '../discordSdk';
import { getUserAvatarUrl, getUserDisplayName } from './user';

const WS_ENDPOINT = `wss://${location.host}/api/colyseus`;

export async function setupGameState({ guildMember, user }) {
  const client = new Client(WS_ENDPOINT);

  let roomName = 'channel';
  if (sdkClient.channelId && sdkClient.guildId) {
    const channel = await sdkClient.commands.getChannel({ channel_id: sdkClient.channelId });
    if (channel.name) {
      roomName = channel.name;
    }
  }

  const room = await client.joinOrCreate('rng_room', {
    channelId: sdkClient.channelId,
    roomName,
    userId: user.id,
    name: getUserDisplayName({ guildMember, user }),
    avatarUrl: getUserAvatarUrl({ guildMember, user }),
  });

  return { room, client };
}
