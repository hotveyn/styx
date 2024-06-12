import { Module } from '@nestjs/common';
import { StatService } from './stat.service';
import { StatController } from './stat.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [StatController],
  providers: [StatService, PrismaService],
})
export class StatModule {}
