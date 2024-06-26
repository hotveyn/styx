import { Module } from '@nestjs/common';
import { CameraService } from './camera.service';
import { CameraController } from './camera.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CameraController],
  providers: [CameraService, PrismaService],
})
export class CameraModule {}
