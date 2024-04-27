import { Schema, type } from '@colyseus/schema';

export type TPlayerOptions = Pick<Player, 'sessionId' | 'userId' | 'name' | 'avatarUrl'>;

export class Player extends Schema {
  @type('string')
  public sessionId: string;

  @type('string')
  public userId: string;

  @type('string')
  public avatarUrl: string;

  @type('string')
  public name: string;

  constructor({ name, userId, avatarUrl, sessionId }: TPlayerOptions) {
    super();
    this.userId = userId;
    this.avatarUrl = avatarUrl;
    this.name = name;
    this.sessionId = sessionId;
  }
}
