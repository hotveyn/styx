import { Module } from '@nestjs/common';
import { FailureNotificationService } from './failure-notification.service';
import { FailureNotificationController } from './failure-notification.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FailureNotificationController],
  providers: [FailureNotificationService, PrismaService],
})
export class FailureNotificationModule {}
