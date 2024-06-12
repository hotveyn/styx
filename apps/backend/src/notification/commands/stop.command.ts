import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { Telegraf } from 'telegraf';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StopCommand extends Command {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  handle(bot: Telegraf): void {
    bot.command('stop', async (ctx) => {
      const deleteSubscriptionResult = await this.deleteSubscription(
        String(ctx.chat.id),
      );

      if (!deleteSubscriptionResult) {
        ctx.reply('Вы не подписаны');
        return;
      }

      ctx.reply('Вы отписались от уведомлений');
    });
  }

  private async deleteSubscription(chatId: string) {
    const sub = await this.prisma.notification.findUnique({
      where: {
        chatId,
      },
    });

    if (!sub) return;

    return await this.prisma.notification.delete({
      where: {
        chatId: sub.chatId,
      },
    });
  }
}
