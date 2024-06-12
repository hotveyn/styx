import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ParameterCenter } from 'src/parameter/parameter.center';
import { Telegraf, session } from 'telegraf';
import { Command } from './commands/command';
import { $Enums } from '@prisma/client';
import * as _ from 'lodash';
import { PrismaService } from 'src/prisma/prisma.service';
import { BetterBigInt } from 'src/utils/big-int-or-undefined';
import { BotLoggerToken } from 'src/logger/bot.logger';
import { Logger } from 'pino';

@Injectable()
export class NotificationBot implements OnApplicationBootstrap {
  bot: Telegraf;
  botToken: string;
  botName: string;

  async onApplicationBootstrap() {
    this.bootstrap();
    this.parameterCenter.emitter.on(
      $Enums.ParameterCode.TELEGRAM_BOT_TOKEN,
      async () => {
        console.log('Telegram bot token updated');
        this.logger.info({
          msg: `telegram bot token changed to ${this.parameterCenter.getTelegramBotToken()}`,
        });
        this.bot.stop('restart bot with new token');
        await this.clearBotSubscriptions();
        this.bootstrap();
      },
    );
  }

  constructor(
    private readonly prisma: PrismaService,
    @Inject('Commands') private readonly commands: Command[],
    @Inject(BotLoggerToken) private readonly logger: Logger,
    private readonly parameterCenter: ParameterCenter,
  ) {}

  public async sendNotificationAboutDiedDevices(
    devices: {
      id: number | bigint;
      organizationId: number | bigint;
      code: string;
    }[],
  ) {
    const groupedDevices = _.groupBy(devices, 'organizationId');

    Object.entries(groupedDevices).forEach(
      async ([organizationId, devices]) => {
        const usersToNotificate = await this.prisma.user.findMany({
          where: {
            organizationId: BetterBigInt(organizationId),
            notification: {
              failure: true,
            },
          },
          include: {
            notification: true,
          },
        });

        try {
          this.logger.debug({
            msg: `Trying to send log error notification to ${usersToNotificate.length} users`,
          });

          usersToNotificate.forEach((user) => {
            this.bot.telegram.sendMessage(
              String(user.notification.chatId),
              `Зарегестированы сбои устройств с кодами: ${devices
                .map((device) => device.code)
                .join(', ')}`,
            );
          });
        } catch (e) {
          this.logger.error({
            msg: 'Error sending log error notification',
            error: e,
          });
        }
      },
    );
  }

  public async sendNotificationAboutErrorLog(
    device: {
      id: number | bigint;
      organizationId: number | bigint;
      code: string;
    },
    errorLogBody: string,
  ) {
    const usersToNotificate = await this.prisma.user.findMany({
      where: {
        organizationId: BetterBigInt(device.organizationId),
        notification: {
          errorLog: true,
        },
      },
      include: {
        notification: true,
      },
    });

    try {
      this.logger.debug({
        msg: `Trying to send log error notification to ${usersToNotificate.length} users`,
      });
      usersToNotificate.forEach((user) => {
        this.bot.telegram.sendMessage(
          String(user.notification.chatId),
          `Устройство с кодом ${device.code} прислало лог с ошибкой: ${errorLogBody}`,
        );
      });
    } catch (e) {
      this.logger.error({
        msg: 'Error sending log error notification',
        error: e,
      });
    }
  }

  private async clearBotSubscriptions() {
    await this.prisma.notification.deleteMany();
  }

  private bootstrap() {
    try {
      this.logger.info({
        msg: 'Bootstrapping telegram bot',
      });
      this.createBot().addCommands().addMiddlewares().launch();
    } catch (e) {
      this.logger.error({
        msg: 'Error starting telegram bot',
        error: e,
      });

      setTimeout(() => this.bootstrap, 5000);
    }
  }

  private createBot() {
    this.bot = new Telegraf(this.parameterCenter.getTelegramBotToken());
    this.botToken = this.parameterCenter.getTelegramBotToken();
    this.botName = this.parameterCenter.getTelegramBotToken();

    process.once('exit', () => {
      this.bot.stop('SIGTERM');
    });

    return this;
  }

  private addMiddlewares() {
    this.bot.use(session());

    this.bot.catch((e) => {
      console.error(e);
      this.logger.error({
        msg: 'Some unhandled error in bot',
        error: e,
        stack: (e as Error).stack,
      });
    });

    return this;
  }

  private addCommands() {
    for (const command of this.commands) {
      command.handle(this.bot);
    }

    return this;
  }

  private launch() {
    this.bot.launch();
    // this.bot.launch({
    //   webhook:
    //     process.env.NODE_ENV === 'PROD'
    //       ? {
    //           domain: process.env.SERVER_HOST,
    //           port: +process.env.SERVER_PORT,
    //         }
    //       : undefined,
    // });

    return this;
  }
}
