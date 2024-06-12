import { Module } from '@nestjs/common';
import { GoalAchieveService } from './goal-achieve.service';
import { PrismaService } from '../prisma/prisma.service';
import { GoalAchieveController } from './goal-achieve.controller';

@Module({
  controllers: [GoalAchieveController],
  providers: [GoalAchieveService, PrismaService],
})
export class GoalAchieveModule {}
