import { Global, Module } from '@nestjs/common';
import { ParameterService } from './parameter.service';
import { ParameterController } from './parameter.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ParameterEntity } from './entity/parameter.entity';
import { ParameterChangeEntityWithPagination } from './entity/parameter-change.entity';
import { ParameterCenter } from './parameter.center';

@Global()
@Module({
  controllers: [ParameterController],
  providers: [
    ParameterService,
    PrismaService,
    ParameterCenter,
    {
      provide: ParameterEntity,
      useFactory: () => ParameterEntity,
    },
    {
      provide: ParameterChangeEntityWithPagination,
      useFactory: () => ParameterChangeEntityWithPagination,
    },
  ],
  exports: [ParameterCenter],
})
export class ParameterModule {}
