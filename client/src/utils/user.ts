import { sdkClient } from '../discordSdk';
import { DiscordUserContext } from './auth';

export function getUserAvatarUrl(
  { guildMember, user }: DiscordUserContext,
  cdn = 'https://cdn.discordapp.com',
  size = 256,
) {
  if (guildMember?.avatar != null && sdkClient.guildId != null) {
    return `${cdn}/guilds/${sdkClient.guildId}/users/${user.id}/avatars/${guildMember.avatar}.png?size=${size}`;
  }
  if (user.avatar != null) {
    return `${cdn}/avatars/${user.id}/${user.avatar}.png?size=${size}`;
  }

  const defaultAvatarIndex = Math.abs(Number(user.id) >> 22) % 6;
  return `${cdn}/embed/avatars/${defaultAvatarIndex}.png?size=${size}`;
}

export function getUserDisplayName({ guildMember, user }: DiscordUserContext) {
  if (guildMember?.nick != null && guildMember.nick !== '') return guildMember.nick;

  if (user.discriminator !== '0') return `${user.username}#${user.discriminator}`;

  if (user.global_name != null && user.global_name !== '') return user.global_name;

  return user.username;
}
