import { Module } from '@nestjs/common';
import { LogErrorService } from './log-error.service';
import { LogErrorController } from './log-error.controller';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [NotificationModule],
  controllers: [LogErrorController],
  providers: [LogErrorService, PrismaService],
})
export class LogErrorModule {}
