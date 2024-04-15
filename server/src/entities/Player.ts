import { Schema, type } from '@colyseus/schema';

export type TPlayerOptions = Pick<Player, 'sessionId' | 'userId' | 'name' | 'avatarUrl' | 'talking'>;

export class Player extends Schema {
  @type('string')
  public sessionId: string;

  @type('string')
  public userId: string;

  @type('string')
  public avatarUrl: string;

  @type('string')
  public name: string;

  @type('boolean')
  public talking: boolean = false;

  // Init
  constructor({ name, userId, avatarUrl, sessionId }: TPlayerOptions) {
    super();
    this.userId = userId;
    this.avatarUrl = avatarUrl;
    this.name = name;
    this.sessionId = sessionId;
  }
}
