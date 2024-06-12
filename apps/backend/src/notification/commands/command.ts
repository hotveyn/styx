import { Telegraf } from 'telegraf';

export abstract class Command {
  abstract handle(bot: Telegraf): void;
}
