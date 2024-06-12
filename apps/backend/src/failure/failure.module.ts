import { Module } from '@nestjs/common';
import { FailureService } from './failure.service';
import { FailureController } from './failure.controller';
import { PrismaService } from '../prisma/prisma.service';
import {
  FailureEntity,
  FailureEntityWithPagination,
} from './entity/failure.entity';
import { NotificationModule } from 'src/notification/notification.module';
import { FailureDetector } from './failure.detector';

@Module({
  imports: [NotificationModule],
  controllers: [FailureController],
  providers: [
    FailureService,
    PrismaService,
    FailureDetector,
    {
      provide: FailureEntity,
      useFactory: () => FailureEntity,
    },
    {
      provide: FailureEntityWithPagination,
      useFactory: () => FailureEntityWithPagination,
    },
  ],
})
export class FailureModule {}
