import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DeviceModule } from './device/device.module';
import { ParameterModule } from './parameter/parameter.module';
import { GoalModule } from './goal/goal.module';
import { OrganizationModule } from './organization/organization.module';
import { LogErrorModule } from './log-error/log-error.module';
import { LogInfoModule } from './log-info/log-info.module';
import { GoalAchieveModule } from './goal-achieve/goal-achieve.module';
import { LoggerModule } from 'nestjs-pino';
import { getServerLogger, getServerLoggerConfig } from './logger/server.logger';
import { ScheduleModule } from '@nestjs/schedule';
import { FailureModule } from './failure/failure.module';
import { ApplicationModule } from './application/application.module';
import { resolve } from 'node:path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CameraModule } from './camera/camera.module';
import { SpeechModule } from './speech/speech.module';
import { FailureNotificationModule } from './failure-notification/failure-notification.module';
import { DadataModule } from './dadata/dadata.module';
import { NotificationModule } from './notification/notification.module';
import { SshModule } from './ssh/ssh.module';
import { StatModule } from './stat/stat.module';

Object.defineProperty(BigInt.prototype, 'toJSON', {
  get() {
    return () => String(this);
  },
});

@Module({
  imports: [
    ParameterModule,
    ServeStaticModule.forRoot({
      rootPath: resolve('uploads', 'applications'),
      serveRoot: `/${process.env.SERVER_GLOBAL_PREFIX ? process.env.SERVER_GLOBAL_PREFIX + '/' : ''}apps/`,
      serveStaticOptions: {
        index: false,
      },
    }),
    ScheduleModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: { logger: getServerLogger(getServerLoggerConfig()) },
    }),
    UserModule,
    AuthModule,
    DeviceModule,
    GoalModule,
    OrganizationModule,
    LogErrorModule,
    LogInfoModule,
    GoalAchieveModule,
    FailureModule,
    FailureNotificationModule,
    ApplicationModule,
    CameraModule,
    SpeechModule,
    DadataModule,
    NotificationModule,
    SshModule,
    StatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
