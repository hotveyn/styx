import { Module } from '@nestjs/common';
import { NotificationBot } from './notification.bot';
import { PrismaService } from 'src/prisma/prisma.service';
import { StartCommand } from './commands/start.command';
import { StopCommand } from './commands/stop.command';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import {
  BotLoggerToken,
  getBotLogger,
  getBotLoggerConfig,
} from 'src/logger/bot.logger';

@Module({
  controllers: [NotificationController],
  providers: [
    PrismaService,
    StartCommand,
    StopCommand,
    {
      provide: 'Commands',
      useFactory: (startCommand: StartCommand, stopCommand: StopCommand) => [
        startCommand,
        stopCommand,
      ],
      inject: [StartCommand, StopCommand],
    },
    {
      provide: BotLoggerToken,
      useFactory: () => getBotLogger(getBotLoggerConfig()),
    },
    NotificationBot,
    NotificationService,
  ],
  exports: [NotificationBot],
})
export class NotificationModule {}
