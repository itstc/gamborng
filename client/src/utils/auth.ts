import { sdkClient } from '../discordSdk';

export type DiscordUserContext = Awaited<ReturnType<typeof setupDiscordSdk>>;

export async function setupDiscordSdk() {
  await sdkClient.ready();

  // Authorize with Discord Client
  const { code } = await sdkClient.commands.authorize({
    client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
    response_type: 'code',
    state: '',
    prompt: 'none',
    scope: ['identify', 'guilds', 'guilds.members.read'],
  });

  // Retrieve an access_token from your activity's server
  const response = await fetch('/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
    }),
  });
  const { access_token } = await response.json();

  // Authenticate with Discord client (using the access_token)
  const newAuth = await sdkClient.commands.authenticate({
    access_token,
  });

  const guildMember = await fetch(`https://discord.com/api/v10/users/@me/guilds/${sdkClient.guildId}/member`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  return { ...newAuth, guildMember };
}
