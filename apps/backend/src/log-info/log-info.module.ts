import { Module } from '@nestjs/common';
import { LogInfoService } from './log-info.service';
import { LogInfoController } from './log-info.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [LogInfoController],
  providers: [LogInfoService, PrismaService],
})
export class LogInfoModule {}
