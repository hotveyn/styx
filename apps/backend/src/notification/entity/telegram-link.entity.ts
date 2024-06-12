import { Expose } from 'class-transformer';

export class TelegramLinkEntity {
  @Expose() link: string;

  constructor(params: TelegramLinkEntity) {
    Object.assign(this, params);
  }
}
