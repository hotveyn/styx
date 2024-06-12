import { Module } from '@nestjs/common';
import { SpeechService } from './speech.service';
import { SpeechController } from './speech.controller';
import { SpeechClient } from './speech.client';
import {
  SpeechLoggerToken,
  getSpeechLogger,
  getSpeechLoggerConfig,
} from 'src/logger/speech.logger';
import { PrismaService } from 'src/prisma/prisma.service';
import { SpeechStorage } from './speech.storage';

@Module({
  controllers: [SpeechController],
  providers: [
    PrismaService,
    SpeechService,
    SpeechClient,
    SpeechStorage,
    {
      provide: SpeechLoggerToken,
      useFactory: () => getSpeechLogger(getSpeechLoggerConfig()),
    },
  ],
})
export class SpeechModule {}
