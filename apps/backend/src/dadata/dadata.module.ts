import { Module } from '@nestjs/common';
import { DadataService } from './dadata.service';
import { DadataController } from './dadata.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { DadataClient } from './dadata.client';
import {
  DadataLoggerToken,
  getDadataLogger,
  getDadataLoggerConfig,
} from 'src/logger/dadata.logger';

@Module({
  controllers: [DadataController],
  providers: [
    DadataService,
    PrismaService,
    DadataClient,
    {
      provide: DadataLoggerToken,
      useFactory: () => getDadataLogger(getDadataLoggerConfig()),
    },
  ],
})
export class DadataModule {}
