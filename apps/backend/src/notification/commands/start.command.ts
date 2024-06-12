import { Telegraf } from 'telegraf';
import { Command } from './command';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StartCommand extends Command {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  handle(bot: Telegraf): void {
    bot.start(async (ctx) => {
      const chatId = ctx.chat.id;

      const user = await this.getUserFromStartMessage(ctx.text);

      if (!user) {
        return ctx.reply('Пользователь не найден');
      }

      if (user.notification) {
        return ctx.reply('Пользователь уже подписался');
      }

      await this.addSubscription(user.id, String(chatId));
      ctx.reply('Подписка на уведомления оформлена');
    });
  }

  private async addSubscription(userId: bigint, chatId: string) {
    const subscription = await this.prisma.notification.create({
      data: {
        chatId,
        userId,
      },
    });

    return subscription;
  }

  private async getUserFromStartMessage(text: string) {
    const textMatch = text.match(/\/start (.+)/);
    if (!textMatch) {
      return;
    }

    const user = await this.prisma.user.findUnique({
      where: {
        code: textMatch[1],
      },
      include: {
        notification: true,
      },
    });

    if (!user) {
      return;
    }

    return user;
  }
}
